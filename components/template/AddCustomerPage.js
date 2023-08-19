import { useState } from "react";
import Form from "../module/form";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

function AddCustomerPage() {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    date: "",
    products: [],
  });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const router = useRouter();

  const cancelHandler = () => {
    setForm({
      name: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      postalCode: "",
      date: "",
      products: [],
    });
    router.push("/");
  };

  const saveHandler = async () => {
    const res = await fetch("/api/customer", {
      method: "POST",
      body: JSON.stringify({ data: form }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    if (data.status == "success") {
      setOpen(true);
      setMessage("اطلاعات با موفقیت ثبت شد.");
      setSeverity("success");
      router.push("/");
    } else if (data.message == "Invalid data") {
      setOpen(true);
      setMessage("مقادبر نام،نام خانوادگی،ایمیل حتما باید پر باشد.");
      setSeverity("error");
    }
  };
  return (
    <div className="customer-page">
      <h4>Add New Customer</h4>
      <Form form={form} setForm={setForm} />
      <div className="customer-page__buttons">
        <button className="first" onClick={cancelHandler}>
          Cancel
        </button>
        <button className="second" onClick={saveHandler}>
          Save
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

export default AddCustomerPage;
