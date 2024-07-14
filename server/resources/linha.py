from flask import request, jsonify
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import jwt_required, get_jwt

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import or_, String

from datetime import datetime, timezone

from db import db
from models import LinhaModel, SentidoModel
from schemas import LinhaSchema, LinhaPaginationSchema


blp = Blueprint("Linhas", __name__, description="Operações com linhas.")


@blp.route("/linhas")
class LinhaList(MethodView):
    @blp.response(200, LinhaPaginationSchema)
    def get(self):
        tipo = request.args.get("tipo", "COLETIVO")
        page = request.args.get("page", 1)
        per_page = request.args.get("per_page", 10)

        try:
            page = int(page)
        except ValueError:
            return (
                jsonify(
                    {"error": "O parâmetro 'page' deve ser um número inteiro válido."}
                ),
                400,
            )

        try:
            per_page = int(per_page)
        except ValueError:
            return (
                jsonify(
                    {
                        "error": "O parâmetro 'per_page' deve ser um número inteiro válido."
                    }
                ),
                400,
            )

        linhas_query = LinhaModel.query.filter(LinhaModel.tipo.cast(String) == tipo)

        # Verificar se há resultados antes da paginação
        total_linhas = linhas_query.count()
        
        if total_linhas == 0:
            return jsonify({"data": [], "page": page, "per_page": 0})

        linhas_paginadas = linhas_query.paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return {
            "items": linhas_paginadas.items,
            "page": linhas_paginadas.page,
            "per_page": linhas_paginadas.pages,
        }


@blp.route("/linhas/search")
class LinhaList(MethodView):
    @blp.response(200, LinhaPaginationSchema)
    def get(self):
        query = request.args.get("query")
        page = int(request.args.get("page", 1))
        per_page = int(request.args.get("per_page", 10))

        if not query:
            return "Consulta inválida, por favor forneça uma consulta válida."

        keywords = query.split(" ")
        linhas = LinhaModel.query

        for keyword in keywords:
            filtered_keyword = keyword.replace("?", " ").replace(".", "")
            linhas = linhas.filter(
                db.or_(
                    LinhaModel.nome.contains(filtered_keyword),
                    LinhaModel.cod.contains(filtered_keyword),
                    LinhaModel.campus.contains(filtered_keyword),
                    LinhaModel.tipo.contains(filtered_keyword),
                    LinhaModel.tags.contains(filtered_keyword),
                )
            )

        linhas = linhas.paginate(page=page, per_page=per_page, error_out=False)

        return {"items": linhas.items, "page": linhas.page, "pages": linhas.pages}

    @blp.response(200)
    def post(self):
        query = request.args.get("query")
        page = int(request.args.get("page", 1))
        per_page = int(request.args.get("per_page", 10))

        if not query:
            return "Consulta inválida, por favor forneça uma consulta válida."

        keywords = query.split(" ")
        linhas = LinhaModel.query

        for keyword in keywords:
            filtered_keyword = keyword.replace("?", "").replace(".", "")
            linhas = linhas.filter(
                db.or_(
                    LinhaModel.nome.contains(filtered_keyword),
                    LinhaModel.cod.contains(filtered_keyword),
                    LinhaModel.campus.contains(filtered_keyword),
                    LinhaModel.tipo.contains(filtered_keyword),
                    LinhaModel.tags.contains(filtered_keyword),
                )
            )

        total_linhas = linhas.count()
        linhas = linhas.paginate(page, per_page, False).items

        if not linhas:
            return "Nenhuma linha de ônibus encontrada."

        if len(linhas) == 1:
            input_text = f"Considere as seguintes informações: Foi encontrada 1 linha; "
        else:
            input_text = f"Considere as seguintes informações: Foram encontradas {total_linhas} linhas; "

        for linha in linhas:
            sentidos = SentidoModel.query.filter(
                SentidoModel.id_linha == linha.id
            ).all()
            input_text += f'Encontrada a linha de ônibus com nome "{linha.cod} {linha.nome}", que contém uma parada próxima ao campus {linha.campus}, contendo {len(sentidos)} sentidos. '

            if len(linhas) < 15:
                input_text = input_text[:-2] + ", sendo esses: "
                for sentido in sentidos:
                    input_text += f"Sentido {sentido.sentido}, que inicia suas operações às {sentido.horario_inicio}, finalizando seu funcionamento às {sentido.horario_fim}. As viagens do sentido {sentido.sentido} partem de {sentido.ponto_partida} e chegam ao destino {sentido.ponto_destino}. "

        input_text += f'Faça um texto resumido gerando apenas as informações pedidas de acordo com as palavras chave "{str(query)}", utilizando como base as linhas de ônibus encontradas, gerando as informações da forma mais simplificada o possível para o entendimento do usuário, leve mais em consideração a localização de origem e o campus onde o ônibus para. '

        resumo = [f"Resumo para a consulta '{query}':\n\n"]
        for linha in linhas:
            sentidos = SentidoModel.query.filter(
                SentidoModel.id_linha == linha.id
            ).all()
            resumo.append(f"Linha: {linha.cod} {linha.nome}\n")
            resumo.append(f"Parada próxima ao campus: {linha.campus}\n")
            for sentido in sentidos:
                resumo.append(f"Sentido: {sentido.sentido}\n")
                resumo.append(f"Horário de início: {sentido.horario_inicio}\n")
                resumo.append(f"Horário de fim: {sentido.horario_fim}\n")
                resumo.append(f"Origem: {sentido.ponto_partida}\n")
                resumo.append(f"Destino: {sentido.ponto_destino}\n")
            resumo.append("\n")

        return "".join(resumo).strip()


@blp.route("/linha")
class Linha(MethodView):
    @blp.response(200, LinhaSchema)
    def get(self):
        linha_id = request.args.get("id")
        linha = LinhaModel.query.get_or_404(linha_id)

        return linha

    @jwt_required()
    @blp.arguments(LinhaSchema)
    @blp.response(201, LinhaSchema)
    def post(self, linha_data):
        usuario_admin = get_jwt()["admin"]

        if usuario_admin:
            linha = LinhaModel(**linha_data)

            try:
                db.session.add(linha)
                db.session.commit()
            except SQLAlchemyError:
                abort(500, "An error ocurred while inserting item to table 'linha'.")

            return linha

        abort(401, "Unauthorized access.")

    @jwt_required()
    @blp.arguments(LinhaSchema)
    @blp.response(200, LinhaSchema)
    def put(self, linha_data):
        usuario_admin = get_jwt()["admin"]

        if usuario_admin:
            linha_id = request.args.get("id")
            linha = LinhaModel.query.get(linha_id)

            if linha:
                linha.cod = linha_data["cod"]
                linha.nome = linha_data["nome"]
                linha.campus = linha_data["campus"]
                linha.valor_inteira = linha_data["valor_inteira"]
                linha.valor_meia = linha_data["valor_meia"]
                linha.tipo = linha_data["tipo"]
                linha.capacidade_assento = linha_data["capacidade_assento"]
                linha.atualizado_em = datetime.now(tz=timezone.utc)
            else:
                linha = LinhaModel(id=linha_id, **linha_data)

            try:
                db.session.add(linha)
                db.session.commit()
            except SQLAlchemyError:
                abort(500, "An error ocurred while updating item in table 'linha'.")

            return linha
        abort(401, "Unauthorized access.")

    @jwt_required()
    @blp.response(204)
    def delete(self):
        usuario_admin = get_jwt()["admin"]

        if usuario_admin:
            linha_id = request.args.get("id")
            linha = LinhaModel.query.get(linha_id)

            if linha:
                db.session.delete(linha)
                db.session.commit()
            else:
                abort(404, "Item not found in table 'linha'.")

            return {"message": "Linha excluida."}

        abort(401, "Unauthorized access.")
