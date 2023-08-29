import { MdAdd } from "react-icons/md"
import { Link } from "react-router-dom"

const AddButton = () => {
  return (
    <Link to="note/new"  className="floating-button">
        <MdAdd/>
    </Link>
  )
}

export default AddButton