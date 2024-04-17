import axios from "axios";
import { useRef } from "react";

const Payment = () => {
  const order = [
    {
      pidx: "SMmdqprwmJEtDAoDhrAoXN",
      total_amount: 1300,
      status: "Completed",
      transaction_id: "9JaK3YpZwxZrfqvD5xWK5f",
      fee: 0,
      refunded: "no",
    },
  ];
  const ancoreRef = useRef<HTMLAnchorElement>(null);

  const handleClick = async () => {
    console.log("hello");
    const response = await axios.post("http://localhost:3333/payment");

    console.log(response.data);

    console.log("🚀 ~ App ~ response:", response.data.data.pidx);

    localStorage.setItem("pidx", response.data.data.pidx);

    ancoreRef.current?.setAttribute("href", response.data.data.payment_url);

    ancoreRef.current?.click();
  };

  const pidx = localStorage.getItem("pidx");
  console.log("🚀 ~ Payment ~ pidx:", pidx);

  const data = { pidx };

  console.log({ params: pidx });

  const handelDetail = async () => {
    const response = await axios.get("http://localhost:3333/txndetail", {
      params: data,
    });
    console.log("🚀 ~ Payment ~ response:", response.data);
    order.push(response.data);
  };

  handelDetail();
  console.log(
    "🚀 ~ Payment ~ order:",
    order.map((order) => order.refunded)
  );

  return (
    <>
      <div className="flex flex-col items-center space-y-7">
        <h1 className="text-red-500 text-center mt-4"> Khalti Payment </h1>
        <button
          onClick={handleClick}
          className="w-48 h-10 bg-blue-700/25 rounded-lg hover:text-white hover:bg-slate-500/35"
        >
          Make a Khalti Payment
        </button>
        <a ref={ancoreRef}></a>
        <table className="flex flex-col items-center" border={1}>
          <tr className="flex items-center space-x-44">
            <th>Id</th>
            <th>Status</th>
            <th>Amount</th>
            <th>transaction_code</th>
            <th>transaction_fee</th>
            <th>refund</th>
          </tr>

          {order.map((order: any, index: number) => (
            <tr className="flex items-center space-x-40" key={index}>
              <td>{order.transaction_id}</td>
              <td>{order.status}</td>
              <td>{order.total_amount}</td>
              <td>{order.pidx}</td>
              <td>{order.fee}</td>
              <td>{order.refunded}</td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};

export default Payment;
