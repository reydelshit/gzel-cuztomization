import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ListFabric = [
  {
    id: 0,
    fabricName: 'Polyester',
    price: 300,
  },
  {
    id: 1,

    fabricName: 'Cotton',
    price: 350,
  },
  {
    id: 2,

    fabricName: 'Linen',
    price: 400,
  },
  {
    id: 3,
    fabricName: 'Silk',
    price: 600,
  },
];

export default function OrderDialog() {
  const [fabric, setFabric] = useState('Cotton');
  const [quantity, setQuantity] = useState(1);
  const [measurements, setMeasurements] = useState({
    bust: '',
    waist: '',
    shoulder: '',
  });

  const [totalPrice, setTotalPrice] = useState(() => {
    const defaultFabric = ListFabric.find((fab) => fab.fabricName === 'Cotton');
    return defaultFabric ? defaultFabric.price : 0;
  });

  useEffect(() => {
    const selectedFabric = ListFabric.find((fab) => fab.fabricName === fabric);
    if (selectedFabric) {
      setTotalPrice(selectedFabric.price);
    }
  }, [fabric]);

  const handleMeasurementChange = (field: string, value: string) => {
    setMeasurements((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
      <div className="flex flex-row">
        {/* Left side - Order form */}
        <div className="p-6 md:w-1/2 md:border-r border-gray-200">
          <h2 className="text-2xl font-medium text-gray-700 mb-6">
            Place your order{' '}
          </h2>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full p-3 bg-gray-200 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size
              </label>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <input
                    type="text"
                    placeholder="Bust"
                    value={measurements.bust}
                    onChange={(e) =>
                      handleMeasurementChange('bust', e.target.value)
                    }
                    className="w-full p-3 bg-gray-200 rounded-md"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Waist"
                    value={measurements.waist}
                    onChange={(e) =>
                      handleMeasurementChange('waist', e.target.value)
                    }
                    className="w-full p-3 bg-gray-200 rounded-md"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Shoulder"
                    value={measurements.shoulder}
                    onChange={(e) =>
                      handleMeasurementChange('shoulder', e.target.value)
                    }
                    className="w-full p-3 bg-gray-200 rounded-md"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="fabric"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fabric
              </label>
              <div className="relative">
                <select
                  id="fabric"
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                  className="w-full p-3 bg-gray-200 rounded-md appearance-none pr-10"
                >
                  {ListFabric.map((fab) => (
                    <option key={fab.id} value={fab.fabricName}>
                      {fab.fabricName}
                    </option>
                  ))}
                </select>

                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="total"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Total
              </label>
              <input
                type="text"
                id="total"
                readOnly
                value={`₱${isNaN(quantity) ? 0 : totalPrice * quantity}`}
                className="w-full p-3 bg-gray-200 rounded-md"
              />
            </div>

            <button
              type="button"
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
            >
              Place order
            </button>
          </div>
        </div>

        {/* Right side - Size chart */}
        <div className="p-6 md:w-1/2">
          <h2 className="text-xl font-medium text-gray-700 mb-4">Sizes</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 px-3 text-left font-medium text-gray-700">
                    Size
                  </th>
                  <th className="py-2 px-3 text-left font-medium text-gray-700">
                    Bust (in)
                  </th>
                  <th className="py-2 px-3 text-left font-medium text-gray-700">
                    Waist(in)
                  </th>
                  <th className="py-2 px-3 text-left font-medium text-gray-700">
                    Shoulder(in)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-3">XS</td>
                  <td className="py-3 px-3">30-32</td>
                  <td className="py-3 px-3">23-25</td>
                  <td className="py-3 px-3">14-15</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-3">S</td>
                  <td className="py-3 px-3">32-34</td>
                  <td className="py-3 px-3">25-27</td>
                  <td className="py-3 px-3">15-16</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-3">M</td>
                  <td className="py-3 px-3">34-36</td>
                  <td className="py-3 px-3">27-29</td>
                  <td className="py-3 px-3">16-17</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-3">L</td>
                  <td className="py-3 px-3">36-38</td>
                  <td className="py-3 px-3">29-31</td>
                  <td className="py-3 px-3">17-18</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-3">XL</td>
                  <td className="py-3 px-3">38-40</td>
                  <td className="py-3 px-3">31-33</td>
                  <td className="py-3 px-3">18-19</td>
                </tr>
                <tr>
                  <td className="py-3 px-3">XXL</td>
                  <td className="py-3 px-3">40-42</td>
                  <td className="py-3 px-3">33-35</td>
                  <td className="py-3 px-3">19-20</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
