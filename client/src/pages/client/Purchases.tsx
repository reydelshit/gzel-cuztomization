import PurchaseTable from './PurchaseTable';

const Purchases = () => {
  return (
    <div className="h-screen">
      <header className="flex h-[4rem] items-center justify-between px-6">
        <h1 className="text-2xl font-bold text-black uppercase italic">
          My Purchases
        </h1>
      </header>

      <div className="w-full flex flex-col justify-center items-center">
        <PurchaseTable />
      </div>
    </div>
  );
};

export default Purchases;
