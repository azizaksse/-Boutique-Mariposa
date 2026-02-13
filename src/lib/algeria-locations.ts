// Algeria 2026 Administrative Division - 69 Wilayas with Communes
// Data includes proper commune splits for new wilayas

export interface Wilaya {
    id: string;
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

// All 69 Wilayas (58 original + 11 new from 2026 division)
export const WILAYAS: Wilaya[] = [
    { id: '01', code: '01', name_fr: 'Adrar', name_ar: 'أدرار', home_fee: 900, stopdesk_fee: 500 },
    { id: '02', code: '02', name_fr: 'Chlef', name_ar: 'الشلف', home_fee: 700, stopdesk_fee: 400 },
    { id: '03', code: '03', name_fr: 'Laghouat', name_ar: 'الأغواط', home_fee: 800, stopdesk_fee: 450 },
    { id: '04', code: '04', name_fr: 'Oum El Bouaghi', name_ar: 'أم البواقي', home_fee: 700, stopdesk_fee: 400 },
    { id: '05', code: '05', name_fr: 'Batna', name_ar: 'باتنة', home_fee: 700, stopdesk_fee: 400 },
    { id: '06', code: '06', name_fr: 'Béjaïa', name_ar: 'بجاية', home_fee: 700, stopdesk_fee: 400 },
    { id: '07', code: '07', name_fr: 'Biskra', name_ar: 'بسكرة', home_fee: 800, stopdesk_fee: 450 },
    { id: '08', code: '08', name_fr: 'Béchar', name_ar: 'بشار', home_fee: 900, stopdesk_fee: 500 },
    { id: '09', code: '09', name_fr: 'Blida', name_ar: 'البليدة', home_fee: 500, stopdesk_fee: 250 },
    { id: '10', code: '10', name_fr: 'Bouira', name_ar: 'البويرة', home_fee: 600, stopdesk_fee: 300 },
    { id: '11', code: '11', name_fr: 'Tamanrasset', name_ar: 'تمنراست', home_fee: 1200, stopdesk_fee: 800 },
    { id: '12', code: '12', name_fr: 'Tébessa', name_ar: 'تبسة', home_fee: 800, stopdesk_fee: 450 },
    { id: '13', code: '13', name_fr: 'Tlemcen', name_ar: 'تلمسان', home_fee: 700, stopdesk_fee: 400 },
    { id: '14', code: '14', name_fr: 'Tiaret', name_ar: 'تيارت', home_fee: 700, stopdesk_fee: 400 },
    { id: '15', code: '15', name_fr: 'Tizi Ouzou', name_ar: 'تيزي وزو', home_fee: 600, stopdesk_fee: 300 },
    { id: '16', code: '16', name_fr: 'Alger', name_ar: 'الجزائر', home_fee: 400, stopdesk_fee: 200 },
    { id: '17', code: '17', name_fr: 'Djelfa', name_ar: 'الجلفة', home_fee: 800, stopdesk_fee: 450 },
    { id: '18', code: '18', name_fr: 'Jijel', name_ar: 'جيجل', home_fee: 700, stopdesk_fee: 400 },
    { id: '19', code: '19', name_fr: 'Sétif', name_ar: 'سطيف', home_fee: 600, stopdesk_fee: 300 },
    { id: '20', code: '20', name_fr: 'Saïda', name_ar: 'سعيدة', home_fee: 700, stopdesk_fee: 400 },
    { id: '21', code: '21', name_fr: 'Skikda', name_ar: 'سكيكدة', home_fee: 700, stopdesk_fee: 400 },
    { id: '22', code: '22', name_fr: 'Sidi Bel Abbès', name_ar: 'سيدي بلعباس', home_fee: 700, stopdesk_fee: 400 },
    { id: '23', code: '23', name_fr: 'Annaba', name_ar: 'عنابة', home_fee: 600, stopdesk_fee: 300 },
    { id: '24', code: '24', name_fr: 'Guelma', name_ar: 'قالمة', home_fee: 700, stopdesk_fee: 400 },
    { id: '25', code: '25', name_fr: 'Constantine', name_ar: 'قسنطينة', home_fee: 600, stopdesk_fee: 300 },
    { id: '26', code: '26', name_fr: 'Médéa', name_ar: 'المدية', home_fee: 600, stopdesk_fee: 300 },
    { id: '27', code: '27', name_fr: 'Mostaganem', name_ar: 'مستغانم', home_fee: 700, stopdesk_fee: 400 },
    { id: '28', code: '28', name_fr: "M'Sila", name_ar: 'المسيلة', home_fee: 700, stopdesk_fee: 400 },
    { id: '29', code: '29', name_fr: 'Mascara', name_ar: 'معسكر', home_fee: 700, stopdesk_fee: 400 },
    { id: '30', code: '30', name_fr: 'Ouargla', name_ar: 'ورقلة', home_fee: 900, stopdesk_fee: 500 },
    { id: '31', code: '31', name_fr: 'Oran', name_ar: 'وهران', home_fee: 600, stopdesk_fee: 300 },
    { id: '32', code: '32', name_fr: 'El Bayadh', name_ar: 'البيض', home_fee: 800, stopdesk_fee: 450 },
    { id: '33', code: '33', name_fr: 'Illizi', name_ar: 'إليزي', home_fee: 1200, stopdesk_fee: 800 },
    { id: '34', code: '34', name_fr: 'Bordj Bou Arreridj', name_ar: 'برج بوعريريج', home_fee: 700, stopdesk_fee: 400 },
    { id: '35', code: '35', name_fr: 'Boumerdès', name_ar: 'بومرداس', home_fee: 600, stopdesk_fee: 300 },
    { id: '36', code: '36', name_fr: 'El Tarf', name_ar: 'الطارف', home_fee: 700, stopdesk_fee: 400 },
    { id: '37', code: '37', name_fr: 'Tindouf', name_ar: 'تندوف', home_fee: 1200, stopdesk_fee: 800 },
    { id: '38', code: '38', name_fr: 'Tissemsilt', name_ar: 'تيسمسيلت', home_fee: 700, stopdesk_fee: 400 },
    { id: '39', code: '39', name_fr: 'El Oued', name_ar: 'الوادي', home_fee: 900, stopdesk_fee: 500 },
    { id: '40', code: '40', name_fr: 'Khenchela', name_ar: 'خنشلة', home_fee: 700, stopdesk_fee: 400 },
    { id: '41', code: '41', name_fr: 'Souk Ahras', name_ar: 'سوق أهراس', home_fee: 700, stopdesk_fee: 400 },
    { id: '42', code: '42', name_fr: 'Tipaza', name_ar: 'تيبازة', home_fee: 600, stopdesk_fee: 300 },
    { id: '43', code: '43', name_fr: 'Mila', name_ar: 'ميلة', home_fee: 700, stopdesk_fee: 400 },
    { id: '44', code: '44', name_fr: 'Aïn Defla', name_ar: 'عين الدفلى', home_fee: 700, stopdesk_fee: 400 },
    { id: '45', code: '45', name_fr: 'Naâma', name_ar: 'النعامة', home_fee: 800, stopdesk_fee: 450 },
    { id: '46', code: '46', name_fr: 'Aïn Témouchent', name_ar: 'عين تموشنت', home_fee: 700, stopdesk_fee: 400 },
    { id: '47', code: '47', name_fr: 'Ghardaïa', name_ar: 'غرداية', home_fee: 900, stopdesk_fee: 500 },
    { id: '48', code: '48', name_fr: 'Relizane', name_ar: 'غليزان', home_fee: 700, stopdesk_fee: 400 },
    { id: '49', code: '49', name_fr: 'Timimoun', name_ar: 'تيميمون', home_fee: 1000, stopdesk_fee: 600 },
    { id: '50', code: '50', name_fr: 'Bordj Badji Mokhtar', name_ar: 'برج باجي مختار', home_fee: 1200, stopdesk_fee: 800 },
    { id: '51', code: '51', name_fr: 'Ouled Djellal', name_ar: 'أولاد جلال', home_fee: 900, stopdesk_fee: 500 },
    { id: '52', code: '52', name_fr: 'Béni Abbès', name_ar: 'بني عباس', home_fee: 1000, stopdesk_fee: 600 },
    { id: '53', code: '53', name_fr: 'In Salah', name_ar: 'عين صالح', home_fee: 1000, stopdesk_fee: 600 },
    { id: '54', code: '54', name_fr: 'In Guezzam', name_ar: 'عين قزام', home_fee: 1200, stopdesk_fee: 800 },
    { id: '55', code: '55', name_fr: 'Touggourt', name_ar: 'تقرت', home_fee: 900, stopdesk_fee: 500 },
    { id: '56', code: '56', name_fr: 'Djanet', name_ar: 'جانت', home_fee: 1200, stopdesk_fee: 800 },
    { id: '57', code: '57', name_fr: "El M'Ghair", name_ar: 'المغير', home_fee: 900, stopdesk_fee: 500 },
    { id: '58', code: '58', name_fr: 'El Meniaa', name_ar: 'المنيعة', home_fee: 900, stopdesk_fee: 500 },
    // NEW WILAYAS (2026 Administrative Division)
    { id: '59', code: '59', name_fr: 'Barika', name_ar: 'بريكة', home_fee: 700, stopdesk_fee: 400 },
    { id: '60', code: '60', name_fr: 'Aflou', name_ar: 'أفلو', home_fee: 800, stopdesk_fee: 450 },
    { id: '61', code: '61', name_fr: 'El Abiodh Sidi Cheikh', name_ar: 'الأبيض سيدي الشيخ', home_fee: 800, stopdesk_fee: 450 },
    { id: '62', code: '62', name_fr: 'Ksar Chellala', name_ar: 'قصر الشلالة', home_fee: 700, stopdesk_fee: 400 },
    { id: '63', code: '63', name_fr: 'Bou Saâda', name_ar: 'بوسعادة', home_fee: 700, stopdesk_fee: 400 },
    { id: '64', code: '64', name_fr: 'Messaâd', name_ar: 'مسعد', home_fee: 800, stopdesk_fee: 450 },
    { id: '65', code: '65', name_fr: 'Aïn Oussara', name_ar: 'عين وسارة', home_fee: 800, stopdesk_fee: 450 },
    { id: '66', code: '66', name_fr: 'Bir El Ater', name_ar: 'بئر العاتر', home_fee: 800, stopdesk_fee: 450 },
    { id: '67', code: '67', name_fr: 'El Kantara', name_ar: 'القنطرة', home_fee: 800, stopdesk_fee: 450 },
    { id: '68', code: '68', name_fr: 'Ksar El Boukhari', name_ar: 'قصر البخاري', home_fee: 600, stopdesk_fee: 300 },
    { id: '69', code: '69', name_fr: 'El Aricha', name_ar: 'العريشة', home_fee: 700, stopdesk_fee: 400 },
];

// Communes organized by Wilaya (with proper splits for new wilayas)
export const COMMUNES: Commune[] = [
    // 16 - Alger
    { id: '16001', name_fr: 'Alger Centre', name_ar: 'الجزائر الوسطى', wilaya_id: '16' },
    { id: '16002', name_fr: 'Bab El Oued', name_ar: 'باب الواد', wilaya_id: '16' },
    { id: '16003', name_fr: 'Bir Mourad Raïs', name_ar: 'بئر مراد رايس', wilaya_id: '16' },
    { id: '16004', name_fr: 'Hydra', name_ar: 'حيدرة', wilaya_id: '16' },
    { id: '16005', name_fr: 'Kouba', name_ar: 'القبة', wilaya_id: '16' },
    { id: '16006', name_fr: 'Dar El Beïda', name_ar: 'الدار البيضاء', wilaya_id: '16' },
    { id: '16007', name_fr: 'Birkhadem', name_ar: 'بئر خادم', wilaya_id: '16' },
    { id: '16008', name_fr: 'El Harrach', name_ar: 'الحراش', wilaya_id: '16' },
    { id: '16009', name_fr: 'Baraki', name_ar: 'براقي', wilaya_id: '16' },
    { id: '16010', name_fr: 'Zeralda', name_ar: 'زرالدة', wilaya_id: '16' },
    { id: '16011', name_fr: 'Cheraga', name_ar: 'الشراقة', wilaya_id: '16' },
    { id: '16012', name_fr: 'Draria', name_ar: 'الدرارية', wilaya_id: '16' },

    // 31 - Oran
    { id: '31001', name_fr: 'Oran', name_ar: 'وهران', wilaya_id: '31' },
    { id: '31002', name_fr: 'Bir El Djir', name_ar: 'بئر الجير', wilaya_id: '31' },
    { id: '31003', name_fr: 'Es Senia', name_ar: 'السانية', wilaya_id: '31' },
    { id: '31004', name_fr: 'Arzew', name_ar: 'أرزيو', wilaya_id: '31' },
    { id: '31005', name_fr: 'Aïn El Turk', name_ar: 'عين الترك', wilaya_id: '31' },
    { id: '31006', name_fr: 'Mers El Kebir', name_ar: 'المرسى الكبير', wilaya_id: '31' },

    // 28 - M'Sila (AFTER split - Bou Saâda communes moved to 63)
    { id: '28001', name_fr: "M'Sila", name_ar: 'المسيلة', wilaya_id: '28' },
    { id: '28002', name_fr: 'Sidi Aissa', name_ar: 'سيدي عيسى', wilaya_id: '28' },
    { id: '28003', name_fr: 'Ain El Hadjel', name_ar: 'عين الحجل', wilaya_id: '28' },
    { id: '28004', name_fr: 'Hammam Dalaa', name_ar: 'حمام الضلعة', wilaya_id: '28' },
    { id: '28005', name_fr: 'Magra', name_ar: 'مقرة', wilaya_id: '28' },
    { id: '28006', name_fr: 'Berhoum', name_ar: 'برهوم', wilaya_id: '28' },
    { id: '28007', name_fr: 'Chellal', name_ar: 'شلال', wilaya_id: '28' },

    // 63 - Bou Saâda (NEW - split from M'Sila)
    { id: '63001', name_fr: 'Bou Saâda', name_ar: 'بوسعادة', wilaya_id: '63' },
    { id: '63002', name_fr: 'El Hamel', name_ar: 'الحامل', wilaya_id: '63' },
    { id: '63003', name_fr: 'Ouled Sidi Brahim', name_ar: 'أولاد سيدي إبراهيم', wilaya_id: '63' },
    { id: '63004', name_fr: 'Ben Srour', name_ar: 'بن سرور', wilaya_id: '63' },
    { id: '63005', name_fr: 'Tamsa', name_ar: 'تامسة', wilaya_id: '63' },

    // 17 - Djelfa (AFTER splits - Messaâd and Aïn Oussara communes moved)
    { id: '17001', name_fr: 'Djelfa', name_ar: 'الجلفة', wilaya_id: '17' },
    { id: '17002', name_fr: 'Hassi Bahbah', name_ar: 'حاسي بحبح', wilaya_id: '17' },
    { id: '17003', name_fr: 'El Idrissia', name_ar: 'الإدريسية', wilaya_id: '17' },
    { id: '17004', name_fr: 'Charef', name_ar: 'الشارف', wilaya_id: '17' },
    { id: '17005', name_fr: 'Dar Chioukh', name_ar: 'دار الشيوخ', wilaya_id: '17' },
    { id: '17006', name_fr: 'Birine', name_ar: 'بيرين', wilaya_id: '17' },

    // 64 - Messaâd (NEW - split from Djelfa)
    { id: '64001', name_fr: 'Messaâd', name_ar: 'مسعد', wilaya_id: '64' },
    { id: '64002', name_fr: 'Guettara', name_ar: 'القطارة', wilaya_id: '64' },
    { id: '64003', name_fr: 'Sed Rahal', name_ar: 'سد الرحال', wilaya_id: '64' },
    { id: '64004', name_fr: 'Douis', name_ar: 'دويس', wilaya_id: '64' },

    // 65 - Aïn Oussara (NEW - split from Djelfa)
    { id: '65001', name_fr: 'Aïn Oussara', name_ar: 'عين وسارة', wilaya_id: '65' },
    { id: '65002', name_fr: 'Zaccar', name_ar: 'زكار', wilaya_id: '65' },
    { id: '65003', name_fr: 'Guernini', name_ar: 'القرنيني', wilaya_id: '65' },
    { id: '65004', name_fr: 'Had Sahary', name_ar: 'حد الصحاري', wilaya_id: '65' },

    // 59 - Barika (NEW - split from Batna)
    { id: '59001', name_fr: 'Barika', name_ar: 'بريكة', wilaya_id: '59' },
    { id: '59002', name_fr: 'Djezzar', name_ar: 'الجزار', wilaya_id: '59' },
    { id: '59003', name_fr: 'Bitam', name_ar: 'بيطام', wilaya_id: '59' },
    // TODO: Verify additional communes for Barika

    // 60 - Aflou (NEW - split from Laghouat)
    { id: '60001', name_fr: 'Aflou', name_ar: 'أفلو', wilaya_id: '60' },
    { id: '60002', name_fr: 'Brida', name_ar: 'بريدة', wilaya_id: '60' },
    { id: '60003', name_fr: 'Sidi Bouzid', name_ar: 'سيدي بوزيد', wilaya_id: '60' },
    // TODO: Verify additional communes for Aflou

    // 61 - El Abiodh Sidi Cheikh (NEW - split from El Bayadh)
    { id: '61001', name_fr: 'El Abiodh Sidi Cheikh', name_ar: 'الأبيض سيدي الشيخ', wilaya_id: '61' },
    { id: '61002', name_fr: 'Arbaouat', name_ar: 'عرباوات', wilaya_id: '61' },
    { id: '61003', name_fr: 'Brezina', name_ar: 'بريزينة', wilaya_id: '61' },
    // TODO: Verify additional communes

    // 62 - Ksar Chellala (NEW - split from Tiaret)
    { id: '62001', name_fr: 'Ksar Chellala', name_ar: 'قصر الشلالة', wilaya_id: '62' },
    { id: '62002', name_fr: 'Zmalet El Emir Abdelkader', name_ar: 'زمالة الأمير عبد القادر', wilaya_id: '62' },
    { id: '62003', name_fr: 'Sidi Bakhti', name_ar: 'سيدي بختي', wilaya_id: '62' },
    // TODO: Verify additional communes

    // 66 - Bir El Ater (NEW - split from Tébessa)
    { id: '66001', name_fr: 'Bir El Ater', name_ar: 'بئر العاتر', wilaya_id: '66' },
    { id: '66002', name_fr: 'Negrine', name_ar: 'نقرين', wilaya_id: '66' },
    { id: '66003', name_fr: 'Ferkane', name_ar: 'فركان', wilaya_id: '66' },
    // TODO: Verify additional communes

    // 67 - El Kantara (NEW - split from Biskra)
    { id: '67001', name_fr: 'El Kantara', name_ar: 'القنطرة', wilaya_id: '67' },
    { id: '67002', name_fr: 'Aïn Zaatout', name_ar: 'عين زعطوط', wilaya_id: '67' },
    { id: '67003', name_fr: 'El Outaya', name_ar: 'الوطاية', wilaya_id: '67' },
    // TODO: Verify additional communes

    // 68 - Ksar El Boukhari (NEW - split from Médéa)
    { id: '68001', name_fr: 'Ksar El Boukhari', name_ar: 'قصر البخاري', wilaya_id: '68' },
    { id: '68002', name_fr: 'El Omaria', name_ar: 'العمارية', wilaya_id: '68' },
    { id: '68003', name_fr: 'Boughzoul', name_ar: 'بوغزول', wilaya_id: '68' },
    // TODO: Verify additional communes

    // 69 - El Aricha (NEW - border wilaya)
    { id: '69001', name_fr: 'El Aricha', name_ar: 'العريشة', wilaya_id: '69' },
    { id: '69002', name_fr: 'Tiout', name_ar: 'تيوت', wilaya_id: '69' },
    { id: '69003', name_fr: 'Moghrar', name_ar: 'مغرار', wilaya_id: '69' },
    // TODO: Verify additional communes for El Aricha
];

// Helper Functions
export function getWilayas(): Wilaya[] {
    return WILAYAS;
}

export function getCommunes(wilayaId: string): Commune[] {
    return COMMUNES.filter(commune => commune.wilaya_id === wilayaId);
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
