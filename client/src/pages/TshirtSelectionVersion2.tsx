import { JERSEY_COLORS, POLO_COLORS, TSHIRT_COLORS } from '@/data/tshirts';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SHIRT_STYLES = [
  {
    id: 'tshirt',
    name: 'T-Shirt',
  },
  {
    id: 'polo',
    name: 'Polo',
  },
  {
    id: 'jersey',
    name: 'Jersey',
  },
];

function TshirtSelectionVersionTwo() {
  //   const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');

  const [selectedStyle, setSelectedStyle] = useState(SHIRT_STYLES[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Get colors based on selected style
  const getColorsForStyle = (styleId: string) => {
    switch (styleId) {
      case 'polo':
        return POLO_COLORS;
      case 'jersey':
        return JERSEY_COLORS;
      default:
        return TSHIRT_COLORS;
    }
  };

  const [selectedColor, setSelectedColor] = useState(TSHIRT_COLORS[0]);

  // Update selected color when style changes
  const handleStyleChange = (style: (typeof SHIRT_STYLES)[0]) => {
    setSelectedStyle(style);
    setSelectedColor(getColorsForStyle(style.id)[0]);
    setIsDropdownOpen(false);
  };

  const handleTShirtClick = (tshirt: string) => {
    if (userRole === 'client') {
      navigate(`/client/create-design?tshirt=${encodeURIComponent(tshirt)}`);
    } else {
      navigate(`/create-design?tshirt=${encodeURIComponent(tshirt)}`);
    }
  };

  const currentColors = getColorsForStyle(selectedStyle.id);

  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto px-4  w-full justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side - Style and Color Selection */}
          <div className="space-y-4">
            {/* Shirt Style Dropdown */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-3">Choose Style</h2>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-2 text-left bg-white border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span>{selectedStyle.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg">
                    {SHIRT_STYLES.map((style) => (
                      <button
                        key={style.id}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                        onClick={() => handleStyleChange(style)}
                      >
                        {style.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Color Selection */}
            <div className="bg-white p-4 rounded-lg shadow-lg h-fit">
              <h2 className="text-lg font-semibold mb-3">Choose Color</h2>
              <div className="grid grid-cols-8 gap-2">
                {currentColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-full aspect-square rounded border transition-all ${
                      selectedColor.name === color.name
                        ? 'border-blue-500 scale-110 shadow-md z-10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700">
                  Selected: {selectedColor.name}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - T-Shirt Preview */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-3">Preview</h2>
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              {selectedStyle.id === 'tshirt' ? (
                <img
                  src={selectedColor.image}
                  alt={selectedColor.name}
                  className="object-contain w-full h-full"
                />
              ) : selectedStyle.id === 'polo' ? (
                <img
                  src={selectedColor.image}
                  alt={selectedColor.name}
                  className="object-contain w-full h-full"
                />
              ) : (
                <img
                  src={selectedColor.image}
                  alt={selectedColor.name}
                  className="object-contain w-full h-full"
                />
              )}
              <button
                onClick={() => handleTShirtClick(selectedColor.image)}
                className="absolute bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <span className="text-sm">Customize Design</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TshirtSelectionVersionTwo;
