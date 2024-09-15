function OrderInfo({ name, phone }) {
  return (
    <div className="space-y-3 border-t-2 border-stone-300 pt-2">
      <h3 className="py-2 text-lg font-bold">Your data</h3>

      <p>
        Name: <span className="font-bold">{name}</span>
      </p>
      <p>
        Phone number: <span className="font-bold">{phone}</span>
      </p>
    </div>
  );
}

export default OrderInfo;
