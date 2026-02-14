// Algeria 2026 Administrative Division - 69 Wilayas with Communes
import { COMMUNE_MASTER_LIST } from './communes-data';
import { wilayas as WILAYAS_DATA } from './wilayas';

export interface Wilaya {
    id: string; // Using string ID to match existing code usage (e.g. '01', '16')
    code: string;
    name_fr: string;
    name_ar: string;
    home_fee: number;
    stopdesk_fee: number;
}

export interface Commune {
    id: string;
    name_fr: string;
    name_ar: string;
    wilaya_id: string;
}

// -----------------------------------------------------------------------------
// 1. RE-MAPPING CONFIGURATION
// -----------------------------------------------------------------------------
// Maps Commune Names to their NEW Wilaya ID (2026 Division).
// If a commune is NOT in this list, it stays in its original wilaya (from MASTER_LIST).
const COMMUNE_REMAPS: Record<string, number> = {
    // 59 - Barika (Split from Batna - 05)
    "Barika": 59,
    "M'doukal": 59,
    "Bitam": 59,
    "Azil Abdelkader": 59,
    "Djezzar": 59,
    "Seggana": 59,
    "Metkaouak": 59,

    // 60 - Aflou (Split from Laghouat - 03)
    "Aflou": 60,
    "Sebgag": 60,
    "Sidi Bouzid": 60,
    "Oued Morra": 60,
    "Laghouat": 3, // Stays
    "Brida": 60,
    "El Ghicha": 60,
    "Haj Mechri": 60,
    "Taouiala": 60,
    "Tadjrouna": 60,

    // 61 - El Abiodh Sidi Cheikh (Split from El Bayadh - 32)
    "El Abiodh Sidi Cheikh": 61,
    "Arbaouat": 61,
    "Brezina": 61,
    "El Bnoud": 61,

    // 62 - Ksar Chellala (Split from Tiaret - 14)
    "Ksar Chellala": 62,
    "Zmalet El Emir Abdelkader": 62,
    "Serghine": 62,
    "Rechaiga": 62,

    // 63 - Bou Saâda (Split from M'Sila - 28)
    "Bou Saada": 63,
    "Bou Saâda": 63, // Handle variations
    "El Hamel": 63,
    "Ouled Sidi Brahim": 63,
    "Benzouh": 63,
    "Ben Srour": 63,
    "Mohamed Boudiaf": 63,
    "Zarzour": 63,
    "Oultem": 63,
    "Tamsa": 63,
    "Maarif": 63,
    "El Houamed": 63,
    "Khoubana": 63,

    // 64 - Messaâd (Split from Djelfa - 17)
    "Messaad": 64,
    "Messaâd": 64,
    "Delkhou": 64,
    "Dellkhou": 64,
    "Sed Rahal": 64,
    "Selmana": 64,
    "El Khemis": 64,
    "Guettara": 64,
    "Oum Laadham": 64,

    // 65 - Aïn Oussara (Split from Djelfa - 17)
    "Ain Oussara": 65,
    "Aïn Oussara": 65,
    "Guernini": 65,
    "Birine": 65,
    "Had Sahary": 65,
    "Bouira Lahdab": 65,
    "Benhar": 65,

    // 66 - Bir El Ater (Split from Tébessa - 12)
    "Bir El Ater": 66,
    "El Ogla": 66,
    "El Mezeraa": 66,
    "Bedjene": 66,
    "Morsott": 66,
    "Bir Dheb": 66,
    "Negrine": 66,
    "Ferkane": 66,
    "Oum Ali": 66,

    // 67 - El Kantara (Split from Biskra - 07)
    "El Kantara": 67,
    "Ain Zaatout": 67,
    "El Outaya": 67,
    "Djemorah": 67,
    "Branis": 67,

    // 68 - Ksar El Boukhari (Split from Médéa - 26)
    "Ksar El Boukhari": 68,
    "Meftaha": 68,
    "Saneg": 68,
    "El Ouinet": 68,
    "Ouled Antar": 68,
    "Boughezoul": 68,
    "Chahbounia": 68,
    "Aziz": 68,

    // 69 - El Aricha (Split from Tlemcen - 13)
    "El Aricha": 69,
    "El Gor": 69,
    "Bouihi": 69, // Often associated
};

// -----------------------------------------------------------------------------
// 2. EXPORTED DATA & FUNCTIONS
// -----------------------------------------------------------------------------

// Adapting the imported wilayas to match our interface
export const WILAYAS: Wilaya[] = WILAYAS_DATA.map(w => ({
    id: w.code, // '01', '02'...
    code: w.code,
    name_fr: w.name_fr,
    name_ar: w.name_ar,
    home_fee: w.home_fee,
    stopdesk_fee: w.stopdesk_fee
}));

export function getWilayas(): Wilaya[] {
    return WILAYAS;
}

export function getWilayaById(id: string): Wilaya | undefined {
    return WILAYAS.find(w => w.id === id);
}

export function getWilayaByName(name: string): Wilaya | undefined {
    return WILAYAS.find(w =>
        w.name_fr.toLowerCase().includes(name.toLowerCase()) ||
        w.name_ar.includes(name)
    );
}

/**
 * Returns the list of communes for a given Wilaya ID,
 * applying the 2026 remapping logic.
 */
export function getCommunes(wilayaIdStr: string): Commune[] {
    const targetWilayaId = parseInt(wilayaIdStr, 10);

    // Filter logic:
    // 1. If asking for a 'New Wilaya' (e.g. 59), find all communes mapped to 59.
    // 2. If asking for an 'Old Wilaya' (e.g. 05), find all communes originally in 05
    //    BUT EXCLUDE those that were remapped to a new wilaya.

    return COMMUNE_MASTER_LIST
        .filter(c => {
            const remappedId = COMMUNE_REMAPS[c.name] || c.wilaya_id;

            // If the commune is remapped, its "effective" wilaya is the remapped ID.
            // If not, it keeps its original ID.
            return remappedId === targetWilayaId;
        })
        .map(c => ({
            id: c.id.toString(),
            name_fr: c.name,
            name_ar: c.name, // Using same name for now as master list doesn't have AR yet.
            wilaya_id: wilayaIdStr
        }))
        .sort((a, b) => a.name_fr.localeCompare(b.name_fr));
}

// For compatibility, we can perform the map once and export a static list if needed,
// but dynamic generation via getCommunes is safer for this logic.
export const COMMUNES: Commune[] = []; // Empty by default, forcing usage of getCommunes()
