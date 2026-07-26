import {
  Receipt,
  Clock3,
  CircleCheckBig,
  CircleX,
} from "lucide-react";

function ExpenseStats({ expenses }) {
  const total = expenses.length;

  const pending = expenses.filter(
    (e) => e.status === "PENDING"
  ).length;

  const approved = expenses.filter(
    (e) => e.status === "APPROVED"
  ).length;

  const rejected = expenses.filter(
    (e) => e.status === "REJECTED"
  ).length;

  const totalAmount = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  const cards = [
    {
      title: "Total Expenses",
      value: total,
      icon: <Receipt size={30} />,
      bg: "bg-blue-500",
    },
    {
      title: "Pending",
      value: pending,
      icon: <Clock3 size={30} />,
      bg: "bg-yellow-500",
    },
    {
      title: "Approved",
      value: approved,
      icon: <CircleCheckBig size={30} />,
      bg: "bg-green-500",
    },
    {
      title: "Rejected",
      value: rejected,
      icon: <CircleX size={30} />,
      bg: "bg-red-500",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {cards.map((card, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg border p-6 flex justify-between items-center"
          >

            <div>

              <p className="text-gray-500 text-sm">

                {card.title}

              </p>

              <h2 className="text-3xl font-bold text-black mt-2">

                {card.value}

              </h2>

            </div>

            <div
              className={`${card.bg} text-white rounded-full p-4`}
            >

              {card.icon}

            </div>

          </div>

        ))}

      </div>

      <div className="bg-white rounded-2xl shadow-lg border mt-6 p-6">

        <h2 className="text-xl font-bold text-black">

          Total Reimbursement Amount

        </h2>

        <h1 className="text-4xl font-bold text-green-600 mt-2">

          ₹ {totalAmount.toFixed(2)}

        </h1>

      </div>
    </>
  );
}

export default ExpenseStats;