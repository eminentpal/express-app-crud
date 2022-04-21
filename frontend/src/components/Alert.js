export default function ({ handleDelete, setAlert }) {
  return (
    <div className="popup-alert">
      <h5>Are you sure to delete this row?</h5>
      <div className="btn-alert">
        <button onClick={() => handleDelete()}>Yes</button>
        <button onClick={() => setAlert(false)}>No</button>
      </div>
    </div>
  );
}
