import Link from "next/link";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import { useState } from "react";

function Card({ customer }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const router = useRouter();
  const handleClose = () => {
    setOpen(false);
  };

  const deleteHandler = async () => {
    const res = await fetch(`/api/delete/${customer._id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.status === "success") {
      setOpen(true);
      setMessage("اطلاعات با موفقیت حذف شد.");
      setSeverity("success");
      router.reload();
    }
  };

  return (
    <div className="card">
      <div className="card__details">
        <p>
          {customer.name} {customer.lastName}
        </p>
        <p>{customer.email}</p>
      </div>
      <div className="card__buttons">
        <button onClick={deleteHandler}>Delete</button>
        <Link href={`edit/${customer._id}`}>Edit</Link>
        <Link href={`/customer/${customer._id}`}>Details</Link>
      </div>
      <Snackbar open={open} autoHideDuration={600000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Card;
