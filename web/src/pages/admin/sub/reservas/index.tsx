import { useRouter } from "next/router"
import { CircleNotch, Export, Funnel, List, MagnifyingGlass, Plus } from "phosphor-react"
import { useEffect, useState } from "react"
import Table from "../../../../components/Table"
import { api } from "../../../../services/api"
import { paginated_reservas, reserva } from "../../../../types/api/reserva"
import { AdminSubMain } from "../../../../styles/pages/admin"
import EditableData from "../../../../components/EditableData"
import { reservaSchema } from "../../../../utils/tableSchemas"
import { clean_object } from "../../../../utils/clean_object"
import Paginator from "../../../../components/Paginator"
import AdminModal from "../../../../components/AdminModal"
import { AdminSubProps } from "../../../../types/pages/AdminSub"

export default function AdminReservas({ item_id, handleSub, handleOpenSidebar, handleCloseSidebar, id_viagem, id_usuario }: AdminSubProps) {
  const router = useRouter()

  const [dataBusy, setDataBusy] = useState<boolean>(false)
  const [reservas, setReservas] = useState<paginated_reservas>()
  const [update, setUpdate] = useState<boolean>(false)

  const [modal, setModal] = useState<boolean>(false)
  const [modalItem, setModalItem] = useState<number>()
  const [modalType, setModalType] = useState<number>(0)
  const [buttonBusy, setButtonBusy] = useState<boolean>(false)

  const [itemData, setItemData] = useState<reserva>()
  const [itemDataRequest, setItemDataRequest] = useState<reserva>()

  const [page, setPage] = useState<number>(1)
  const showFilter = Object.keys(reservaSchema.fields).find(item => item.startsWith('id_'))

  function goTo(route: string) {
    event.preventDefault()
    router.push(route)
  }

  function handleOpenMenuModal(id: number) {
    setModal(true)
    setModalItem(id)

    setModalType(3)
  }

  function handleOpenExportModal() {
    setModal(true)
    setModalType(5)
  }

  function handleOpenAddModal() {
    const obj = clean_object(reservaSchema.fields) as reserva;

    setModal(true)
    setModalItem(null)
    setItemData(obj)
    setItemDataRequest(obj)
    setModalType(1)
  }

  function handleOpenEditModal(id: number) {
    setModal(true)
    setModalItem(id)
    setItemData(reservas.items.find(item => item.id === id))
    setItemDataRequest(reservas.items.find(item => item.id === id))
    setModalType(0)
  }

  function handleOpenErrorModal() {
    setModal(true)
    setModalItem(null)
    setModalType(2)
  }

  function handleCloseModal() {
    setModal(false)
  }

  function handleOpenFilterModal() {
    setModal(true)
    setModalItem(null)
    setItemData(null)
    setItemDataRequest(null)
    setModalType(4)
  }

  async function handleAddItem(data: reserva) {
    const { id: _id, criado_em, atualizado_em, usuario, viagem, ...filteredData } = data

    setButtonBusy(true)

    await api.post(`/reserva`, filteredData)

    setButtonBusy(false)
    handleCloseModal()
    setUpdate(!update)
  }

  async function handleEditItem(id: number, data: reserva) {
    const { id: _id, criado_em, atualizado_em, usuario, viagem, ...filteredData } = data

    setButtonBusy(true)

    await api.put(`/reserva?id=${id}`, filteredData)

    setButtonBusy(false)
    handleCloseModal()
    setUpdate(!update)
  }

  useEffect(() => {
    const fetch = async () => {
      setDataBusy(true)

      let api_link = `/reservas?page=${page}&limit=15`

      if (item_id) {
        await api.get(`/reserva?id=${item_id}`).then(res => setReservas({
          items: [res.data],
          pages: '1',
          page: '1'
        })).catch(() => handleOpenErrorModal())
        setDataBusy(false)

        return
      }
      
      if (id_viagem) {
        api_link += `${api_link.includes('=') ? '&' : ''}viagem=${id_viagem}`
      }

      if (id_usuario) {
        api_link += `${api_link.includes('=') ? '&' : ''}usuario=${id_usuario}`
      }

      await api.get(api_link).then(res => setReservas(res.data))
      setDataBusy(false)
    }

    fetch()
  }, [update, item_id, id_viagem, id_usuario, page])

  return (
    <AdminSubMain>
      <AdminModal
        isOpen={modal}
        onRequestClose={handleCloseModal}
        modalType={modalType}
        schema={reservaSchema}
        handleAddItem={handleAddItem}
        handleOpenEditModal={handleOpenEditModal}
        handleEditItem={handleEditItem}
        modalItem={modalItem}
        itemData={itemData}
        itemDataRequest={itemDataRequest}
        setItemDataRequest={setItemDataRequest}
        buttonBusy={buttonBusy}
        setButtonBusy={setButtonBusy}
        handleSub={handleSub}
        setUpdate={setUpdate}
        update={update}
      />

      <section className='dataSection'>
        <div className="headerContainer">
          <button onClick={handleOpenSidebar}>
            <List size={24} weight='regular' color="rgba(0, 0, 0, 0.8)" />
          </button>
          <h2>Reservas</h2>
        </div>

        <h3 className='lead'>Selecione, adicione, altere ou remova reservas.</h3>
        <div className="actionsContainer">
          {reservas &&
            <button onClick={handleOpenExportModal}>
              <Export size={18} weight='regular' color='#276749' />
              Exportar para CSV
            </button>
          }

          {
            showFilter &&
            <button onClick={handleOpenFilterModal}>
              <Funnel size={18} weight='regular' color='#276749' />
              Filtrar
            </button>
          }
        </div>
      </section>

      <button className="addButton" onClick={() => handleOpenAddModal()}><Plus size={24} weight='regular' color='white' /></button>

      <section className='lineSection'>
        <Table header={Object.keys(reservaSchema.fields).filter(item => item !== 'usuario' && item !== 'viagem')}>
          {dataBusy ?
            <tr>
              <td style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row-reverse',
                gap: '0.25rem',
              }}>
                Carregando <CircleNotch className="load" size={18} weight='regular' color="#2f855a" />
              </td>
            </tr>
            :
            reservas && reservas.items.map(reserva => (
              <EditableData
                key={reserva.id}
                data={reserva}
                tableSchema={reservaSchema}
                update={update}
                setUpdate={setUpdate}
                handleOpenMenuModal={handleOpenMenuModal}
                handleCloseModal={handleCloseModal}
              />
            ))}
        </Table>
      </section>

      {
        reservas &&
        <Paginator
          setPage={setPage}
          page={page}
          update={update}
          setUpdate={setUpdate}
          data={reservas}
        />
      }
    </AdminSubMain>
  )
}