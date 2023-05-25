import { Tr } from "./styles";
import { useRouter } from "next/router";
import { EditableDataProps } from "../../types/components/EditableData";

export default function EditableData({ data, tableSchema, handleOpenMenuModal }: EditableDataProps) {
  const router = useRouter()
  const organizedData = Object.assign(tableSchema.fields, data)
  const dataValues = Object.values(organizedData)
  const filteredValues = dataValues.map(value => value === null ? '' : value)

  return (
    <Tr onClick={() => handleOpenMenuModal(data.id)}>
      {filteredValues.map((value, index) => {
        if (typeof value === 'object') {
          return null
        }

        if (typeof value === 'boolean') {
          return (
            <td key={value + (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000).toString() + index.toString()}>
              {value? 'true' : 'false'}
            </td>
          )
        }

        return (
          <td key={value + (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000).toString() + index.toString()}>
            {value}
          </td>
        )
      })}
    </Tr>
  )
}