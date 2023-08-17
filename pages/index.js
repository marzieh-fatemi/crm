
import HomePage from "@/components/template/HomePage";
import Customer from "@/models/Customer";
import connectDB from "@/utils/connectDB";

export default function Index({ customers }) {
  return <HomePage customers={customers} />;
}

export async function getServerSideProps() {
  try {
    await connectDB();
    const customer = await Customer.find();
    return {
      props: {
        customers: JSON.parse(JSON.stringify(customer)),
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}
