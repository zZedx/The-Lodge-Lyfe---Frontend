import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'

const CabinTableOperations = () => {
  return (
    <TableOperations> 
        <Filter filterField={"filter"} options={[{value : 'all' , label : "All"} , {value : 'no-discount' , label : "No discount"} , {value : 'with-discount' , label : "With Discount"}]}/>
    </TableOperations>
  )
}

export default CabinTableOperations