import axiosInstance from "../../utils/axios";
interface MenuItemProps {
  menuId: number;
  restaurantId: number;
  name: string;
  price: number;
  onEdit: () => void;
  onDelete: (id: number) => void;
}
async function deleteMenu(menuId: number, restaurantId: number) {
  axiosInstance
    .delete(
      `http://127.0.0.1:8000/restaurant/${restaurantId}/list-menu/${menuId}/`
    )
    .then(() => Promise.resolve())
    .catch((error) => console.log(error));
}
const MenuItem = ({
  menuId,
  restaurantId,
  name,
  price,
  onEdit,
  onDelete,
}: MenuItemProps) => {
  return (
    <div className="menu-item" data-id={menuId}>
      <div className="menu-item-info">
        <div className="menu-item-name">{name}</div>
        <div className="menu-item-price">${price.toFixed(2)}</div>
      </div>
      <div className="menu-item-actions">
        <button className="edit-button" onClick={onEdit}>
          Edit
        </button>
        <button
          className="delete-button"
          onClick={() => {
            deleteMenu(menuId, restaurantId).then(() => onDelete(menuId));
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default MenuItem;
