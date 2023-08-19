import { useState } from "react";
import Form from "../module/form";
import { useRouter } from "next/router";
import moment from "moment/moment";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";


function CustomerEditPage({ data, id }) {
    const date=data.date ? moment(data.date).utc().format("YYYY-MM-DD") : "";
  const [form, setForm] = useState({
    name: data.name,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone || "",
    address: data.address || "",
    postalCode: data.postalCode || "",
    products: data.products || "",
    date: date || "",
  });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const handleClose = () => {
    setOpen(false);
  };


  const router = useRouter();

  const cancelHandler = () => {
    router.push("/");
  };

  const editHandler = async () => {
    const res = await fetch(`/api/edit/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ data: form }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (data.status === "success") {
      setOpen(true);
      setMessage("اطلاعات با موفقیت به روز رسانی شد.");
      setSeverity("success");
      router.push("/");
    }
  };
  return (
    <div className="customer-page">
      <h4>Edit Customer</h4>
      <Form form={form} setForm={setForm} />
      <div className="customer-page__buttons">
        <button className="first" onClick={cancelHandler}>
          Cancel
        </button>
        <button className="second" onClick={editHandler}>
          Edit
        </button>
      </div>
      <Snackbar open={open} autoHideDuration={600000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomerEditPage;
