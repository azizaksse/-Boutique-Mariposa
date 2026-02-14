import { useState, useEffect } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { getWilayas, type Wilaya } from '../lib/algeria-locations';
import { clsx } from 'clsx';

interface LocationSelectorProps {
    onSelect: (location: { wilaya: string; commune: string; wilaya_id: string }) => void;
    defaultWilaya?: string;
    defaultCommune?: string;
    className?: string;
}

export function LocationSelector({
    onSelect,
    defaultWilaya,
    defaultCommune,
    className,
}: LocationSelectorProps) {
    const [selectedWilaya, setSelectedWilaya] = useState<Wilaya | null>(null);
    const [communeName, setCommuneName] = useState<string>('');
    const [wilayaSearch, setWilayaSearch] = useState('');
    const [showWilayaDropdown, setShowWilayaDropdown] = useState(false);

    const wilayas = getWilayas();

    // Filter wilayas based on search
    const filteredWilayas = wilayas.filter(wilaya =>
        wilaya.name_fr.toLowerCase().includes(wilayaSearch.toLowerCase()) ||
        wilaya.code.includes(wilayaSearch) ||
        wilaya.name_ar.includes(wilayaSearch)
    );

    // Set default values
    useEffect(() => {
        if (defaultWilaya && !selectedWilaya) {
            const wilaya = wilayas.find(w =>
                w.name_fr === defaultWilaya || w.code === defaultWilaya
            );
            if (wilaya) {
                setSelectedWilaya(wilaya);
            }
        }
    }, [defaultWilaya, wilayas, selectedWilaya]);

    useEffect(() => {
        if (defaultCommune && !communeName) {
            setCommuneName(defaultCommune);
        }
    }, [defaultCommune, communeName]);

    const handleWilayaSelect = (wilaya: Wilaya) => {
        setSelectedWilaya(wilaya);
        setShowWilayaDropdown(false);
        setWilayaSearch('');
        // We trigger update if commune name is already typed
        if (communeName) {
            onSelect({
                wilaya: `${wilaya.code} - ${wilaya.name_fr}`,
                commune: communeName,
                wilaya_id: wilaya.id,
            });
        }
    };

    const handleCommuneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCommune = e.target.value;
        setCommuneName(newCommune);

        if (selectedWilaya) {
            onSelect({
                wilaya: `${selectedWilaya.code} - ${selectedWilaya.name_fr}`,
                commune: newCommune,
                wilaya_id: selectedWilaya.id,
            });
        }
    };

    return (
        <div className={clsx('space-y-4', className)}>
            {/* Wilaya Selector */}
            <div className="relative">
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Wilaya *
                </label>
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setShowWilayaDropdown(!showWilayaDropdown)}
                        className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-left flex items-center justify-between"
                    >
                        <span className={clsx(
                            selectedWilaya ? 'text-secondary-900' : 'text-secondary-400'
                        )}>
                            {selectedWilaya
                                ? `${selectedWilaya.code} - ${selectedWilaya.name_fr}`
                                : 'Sélectionnez une wilaya'
                            }
                        </span>
                        <ChevronsUpDown className="h-4 w-4 text-secondary-400" />
                    </button>

                    {showWilayaDropdown && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-secondary-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
                            {/* Search Input */}
                            <div className="p-2 border-b border-secondary-200">
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    value={wilayaSearch}
                                    onChange={(e) => setWilayaSearch(e.target.value)}
                                    className="w-full px-3 py-1.5 border border-secondary-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    autoFocus
                                />
                            </div>

                            {/* Options List */}
                            <div className="overflow-y-auto max-h-48">
                                {filteredWilayas.length > 0 ? (
                                    filteredWilayas.map((wilaya) => (
                                        <button
                                            key={wilaya.id}
                                            type="button"
                                            onClick={() => handleWilayaSelect(wilaya)}
                                            className={clsx(
                                                'w-full px-3 py-2 text-left text-sm hover:bg-secondary-50 flex items-center justify-between',
                                                selectedWilaya?.id === wilaya.id && 'bg-primary-50 text-primary-700'
                                            )}
                                        >
                                            <span>{wilaya.code} - {wilaya.name_fr}</span>
                                            {selectedWilaya?.id === wilaya.id && (
                                                <Check className="h-4 w-4 text-primary-600" />
                                            )}
                                        </button>
                                    ))
                                ) : (
                                    <div className="px-3 py-4 text-sm text-secondary-400 text-center">
                                        Aucune wilaya trouvée
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Commune Input (Manual) */}
            <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Commune *
                </label>
                <input
                    type="text"
                    value={communeName}
                    onChange={handleCommuneChange}
                    placeholder="Écrivez le nom de votre commune..."
                    className={clsx(
                        'w-full px-3 py-2 border rounded-lg',
                        !selectedWilaya
                            ? 'bg-secondary-50 border-secondary-200 text-secondary-400 cursor-not-allowed'
                            : 'bg-white border-secondary-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
                    )}
                    disabled={!selectedWilaya}
                />
            </div>

            {/* Click outside to close dropdowns */}
            {showWilayaDropdown && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowWilayaDropdown(false)}
                />
            )}
        </div>
    );
}
