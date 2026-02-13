export type City = {
    id: string;
    commune_name_ascii: string;
    commune_name: string;
    daira_name_ascii: string;
    daira_name: string;
    wilaya_code: string;
    wilaya_name_ascii: string;
    wilaya_name: string;
};

// Comprehensive list of major communes (Chef-lieus of Dairas + others) for 58 Wilayas
export const cities: City[] = [
    // 01 Adrar
    { id: "101", commune_name_ascii: "Adrar", commune_name: "أدرار", daira_name_ascii: "Adrar", daira_name: "أدرار", wilaya_code: "01", wilaya_name_ascii: "Adrar", wilaya_name: "أدرار" },
    { id: "102", commune_name_ascii: "Tamest", commune_name: "تامست", daira_name_ascii: "Fenoughil", daira_name: "فنوغيل", wilaya_code: "01", wilaya_name_ascii: "Adrar", wilaya_name: "أدرار" },
    { id: "103", commune_name_ascii: "Charouine", commune_name: "شروين", daira_name_ascii: "Charouine", daira_name: "شروين", wilaya_code: "01", wilaya_name_ascii: "Adrar", wilaya_name: "أدرار" },
    { id: "104", commune_name_ascii: "Reggane", commune_name: "رقان", daira_name_ascii: "Reggane", daira_name: "رقان", wilaya_code: "01", wilaya_name_ascii: "Adrar", wilaya_name: "أدرار" },

    // 02 Chlef
    { id: "201", commune_name_ascii: "Chlef", commune_name: "الشلف", daira_name_ascii: "Chlef", daira_name: "الشلف", wilaya_code: "02", wilaya_name_ascii: "Chlef", wilaya_name: "الشلف" },
    { id: "202", commune_name_ascii: "Tenes", commune_name: "تنس", daira_name_ascii: "Tenes", daira_name: "تنس", wilaya_code: "02", wilaya_name_ascii: "Chlef", wilaya_name: "الشلف" },
    { id: "203", commune_name_ascii: "Benairia", commune_name: "بنايرية", daira_name_ascii: "Zeboudja", daira_name: "الزبوجة", wilaya_code: "02", wilaya_name_ascii: "Chlef", wilaya_name: "الشلف" },
    { id: "204", commune_name_ascii: "El Karimia", commune_name: "الكريمية", daira_name_ascii: "El Karimia", daira_name: "الكريمية", wilaya_code: "02", wilaya_name_ascii: "Chlef", wilaya_name: "الشلف" },

    // 03 Laghouat
    { id: "301", commune_name_ascii: "Laghouat", commune_name: "الأغواط", daira_name_ascii: "Laghouat", daira_name: "الأغواط", wilaya_code: "03", wilaya_name_ascii: "Laghouat", wilaya_name: "الأغواط" },
    { id: "302", commune_name_ascii: "Ksar El Hirane", commune_name: "قصر الحيران", daira_name_ascii: "Ksar El Hirane", daira_name: "قصر الحيران", wilaya_code: "03", wilaya_name_ascii: "Laghouat", wilaya_name: "الأغواط" },
    { id: "303", commune_name_ascii: "Aflou", commune_name: "أفلو", daira_name_ascii: "Aflou", daira_name: "أفلو", wilaya_code: "03", wilaya_name_ascii: "Laghouat", wilaya_name: "الأغواط" },

    // 04 Oum El Bouaghi
    { id: "401", commune_name_ascii: "Oum El Bouaghi", commune_name: "أم البواقي", daira_name_ascii: "Oum El Bouaghi", daira_name: "أم البواقي", wilaya_code: "04", wilaya_name_ascii: "Oum El Bouaghi", wilaya_name: "أم البواقي" },
    { id: "402", commune_name_ascii: "Ain Beida", commune_name: "عين البيضاء", daira_name_ascii: "Ain Beida", daira_name: "عين البيضاء", wilaya_code: "04", wilaya_name_ascii: "Oum El Bouaghi", wilaya_name: "أم البواقي" },
    { id: "403", commune_name_ascii: "Ain M'lila", commune_name: "عين مليلة", daira_name_ascii: "Ain M'lila", daira_name: "عين مليلة", wilaya_code: "04", wilaya_name_ascii: "Oum El Bouaghi", wilaya_name: "أم البواقي" },

    // 05 Batna
    { id: "501", commune_name_ascii: "Batna", commune_name: "باتنة", daira_name_ascii: "Batna", daira_name: "باتنة", wilaya_code: "05", wilaya_name_ascii: "Batna", wilaya_name: "باتنة" },
    { id: "502", commune_name_ascii: "Barika", commune_name: "بريكة", daira_name_ascii: "Barika", daira_name: "بريكة", wilaya_code: "05", wilaya_name_ascii: "Batna", wilaya_name: "باتنة" },
    { id: "503", commune_name_ascii: "Merouana", commune_name: "مروانة", daira_name_ascii: "Merouana", daira_name: "مروانة", wilaya_code: "05", wilaya_name_ascii: "Batna", wilaya_name: "باتنة" },

    // 06 Bejaia
    { id: "601", commune_name_ascii: "Bejaia", commune_name: "بجاية", daira_name_ascii: "Bejaia", daira_name: "بجاية", wilaya_code: "06", wilaya_name_ascii: "Bejaia", wilaya_name: "بجاية" },
    { id: "602", commune_name_ascii: "Amizour", commune_name: "أميزور", daira_name_ascii: "Amizour", daira_name: "أميزور", wilaya_code: "06", wilaya_name_ascii: "Bejaia", wilaya_name: "بجاية" },
    { id: "603", commune_name_ascii: "Akbou", commune_name: "أقبو", daira_name_ascii: "Akbou", daira_name: "أقبو", wilaya_code: "06", wilaya_name_ascii: "Bejaia", wilaya_name: "بجاية" },

    // 07 Biskra
    { id: "701", commune_name_ascii: "Biskra", commune_name: "بسكرة", daira_name_ascii: "Biskra", daira_name: "بسكرة", wilaya_code: "07", wilaya_name_ascii: "Biskra", wilaya_name: "بسكرة" },
    { id: "702", commune_name_ascii: "Tolga", commune_name: "طولقة", daira_name_ascii: "Tolga", daira_name: "طولقة", wilaya_code: "07", wilaya_name_ascii: "Biskra", wilaya_name: "بسكرة" },

    // 08 Bechar
    { id: "801", commune_name_ascii: "Bechar", commune_name: "بشار", daira_name_ascii: "Bechar", daira_name: "بشار", wilaya_code: "08", wilaya_name_ascii: "Bechar", wilaya_name: "بشار" },

    // 09 Blida
    { id: "901", commune_name_ascii: "Blida", commune_name: "البليدة", daira_name_ascii: "Blida", daira_name: "البليدة", wilaya_code: "09", wilaya_name_ascii: "Blida", wilaya_name: "البليدة" },
    { id: "902", commune_name_ascii: "Boufarik", commune_name: "بوفاريك", daira_name_ascii: "Boufarik", daira_name: "بوفاريك", wilaya_code: "09", wilaya_name_ascii: "Blida", wilaya_name: "البليدة" },
    { id: "903", commune_name_ascii: "El Affroun", commune_name: "العفرون", daira_name_ascii: "El Affroun", daira_name: "العفرون", wilaya_code: "09", wilaya_name_ascii: "Blida", wilaya_name: "البليدة" },

    // 10 Bouira
    { id: "1001", commune_name_ascii: "Bouira", commune_name: "البويرة", daira_name_ascii: "Bouira", daira_name: "البويرة", wilaya_code: "10", wilaya_name_ascii: "Bouira", wilaya_name: "البويرة" },
    { id: "1002", commune_name_ascii: "Lakhdaria", commune_name: "الأخضرية", daira_name_ascii: "Lakhdaria", daira_name: "الأخضرية", wilaya_code: "10", wilaya_name_ascii: "Bouira", wilaya_name: "البويرة" },

    // 11 Tamanrasset
    { id: "1101", commune_name_ascii: "Tamanrasset", commune_name: "تمنراست", daira_name_ascii: "Tamanrasset", daira_name: "تمنراست", wilaya_code: "11", wilaya_name_ascii: "Tamanrasset", wilaya_name: "تمنراست" },

    // 12 Tebessa
    { id: "1201", commune_name_ascii: "Tebessa", commune_name: "تبسة", daira_name_ascii: "Tebessa", daira_name: "تبسة", wilaya_code: "12", wilaya_name_ascii: "Tebessa", wilaya_name: "تبسة" },

    // 13 Tlemcen
    { id: "1301", commune_name_ascii: "Tlemcen", commune_name: "تلمسان", daira_name_ascii: "Tlemcen", daira_name: "تلمسان", wilaya_code: "13", wilaya_name_ascii: "Tlemcen", wilaya_name: "تلمسان" },
    { id: "1302", commune_name_ascii: "Maghnia", commune_name: "مغنية", daira_name_ascii: "Maghnia", daira_name: "مغنية", wilaya_code: "13", wilaya_name_ascii: "Tlemcen", wilaya_name: "تلمسان" },

    // 14 Tiaret
    { id: "1401", commune_name_ascii: "Tiaret", commune_name: "تيارت", daira_name_ascii: "Tiaret", daira_name: "تيارت", wilaya_code: "14", wilaya_name_ascii: "Tiaret", wilaya_name: "تيارت" },

    // 15 Tizi Ouzou
    { id: "1501", commune_name_ascii: "Tizi Ouzou", commune_name: "تيزي وزو", daira_name_ascii: "Tizi Ouzou", daira_name: "تيزي وزو", wilaya_code: "15", wilaya_name_ascii: "Tizi Ouzou", wilaya_name: "تيزي وزو" },
    { id: "1502", commune_name_ascii: "Azazga", commune_name: "عزازقة", daira_name_ascii: "Azazga", daira_name: "عزازقة", wilaya_code: "15", wilaya_name_ascii: "Tizi Ouzou", wilaya_name: "تيزي وزو" },

    // 16 Alger
    { id: "1601", commune_name_ascii: "Alger Centre", commune_name: "الجزائر الوسطى", daira_name_ascii: "Sidi M'Hamed", daira_name: "سيدي امحمد", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1602", commune_name_ascii: "Sidi M'Hamed", commune_name: "سيدي امحمد", daira_name_ascii: "Sidi M'Hamed", daira_name: "سيدي امحمد", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1603", commune_name_ascii: "El Madania", commune_name: "المدنية", daira_name_ascii: "Sidi M'Hamed", daira_name: "سيدي امحمد", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1604", commune_name_ascii: "Belouizdad", commune_name: "بلوزداد", daira_name_ascii: "Hussein Dey", daira_name: "حسين داي", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1605", commune_name_ascii: "Bab El Oued", commune_name: "باب الوادي", daira_name_ascii: "Bab El Oued", daira_name: "باب الوادي", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1606", commune_name_ascii: "Bologhine", commune_name: "بولوغين", daira_name_ascii: "Bab El Oued", daira_name: "باب الوادي", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1607", commune_name_ascii: "Casbah", commune_name: "القصبة", daira_name_ascii: "Bab El Oued", daira_name: "باب الوادي", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1608", commune_name_ascii: "Oued Koriche", commune_name: "وادي قريش", daira_name_ascii: "Bab El Oued", daira_name: "باب الوادي", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1609", commune_name_ascii: "Bir Mourad Rais", commune_name: "بئر مراد رايس", daira_name_ascii: "Bir Mourad Rais", daira_name: "بئر مراد رايس", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1610", commune_name_ascii: "El Biar", commune_name: "الابيار", daira_name_ascii: "Bouzareah", daira_name: "بوزريعة", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1611", commune_name_ascii: "Bouzareah", commune_name: "بوزريعة", daira_name_ascii: "Bouzareah", daira_name: "بوزريعة", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1612", commune_name_ascii: "Ben Aknoun", commune_name: "بن عكنون", daira_name_ascii: "Bouzareah", daira_name: "بوزريعة", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1613", commune_name_ascii: "Hydra", commune_name: "حيدرة", daira_name_ascii: "Bir Mourad Rais", daira_name: "بئر مراد رايس", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1614", commune_name_ascii: "El Harrach", commune_name: "الحراش", daira_name_ascii: "El Harrach", daira_name: "الحراش", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1615", commune_name_ascii: "Bourouba", commune_name: "بوروبة", daira_name_ascii: "El Harrach", daira_name: "الحراش", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1616", commune_name_ascii: "Hussein Dey", commune_name: "حسين داي", daira_name_ascii: "Hussein Dey", daira_name: "حسين داي", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1617", commune_name_ascii: "Kouba", commune_name: "القبة", daira_name_ascii: "Hussein Dey", daira_name: "حسين داي", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1618", commune_name_ascii: "Bachedjerah", commune_name: "باش جراح", daira_name_ascii: "El Harrach", daira_name: "الحراش", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1619", commune_name_ascii: "Dar El Beida", commune_name: "الدار البيضاء", daira_name_ascii: "Dar El Beida", daira_name: "الدار البيضاء", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1620", commune_name_ascii: "Bab Ezzouar", commune_name: "باب الزوار", daira_name_ascii: "Dar El Beida", daira_name: "الدار البيضاء", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1621", commune_name_ascii: "Ben Arous", commune_name: "بن عروس", daira_name_ascii: "Dar El Beida", daira_name: "الدار البيضاء", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" }, // Actually Bordj El Kiffan area
    { id: "1622", commune_name_ascii: "Bordj El Kiffan", commune_name: "برج الكيفان", daira_name_ascii: "Dar El Beida", daira_name: "الدار البيضاء", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1623", commune_name_ascii: "Rouiba", commune_name: "الرويبة", daira_name_ascii: "Rouiba", daira_name: "الرويبة", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1624", commune_name_ascii: "Reghaia", commune_name: "الرغاية", daira_name_ascii: "Rouiba", daira_name: "الرويبة", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1625", commune_name_ascii: "Ain Taya", commune_name: "عين طاية", daira_name_ascii: "Dar El Beida", daira_name: "الدار البيضاء", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1626", commune_name_ascii: "El Marsa", commune_name: "المرسى", daira_name_ascii: "Dar El Beida", daira_name: "الدار البيضاء", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1627", commune_name_ascii: "Heraoua", commune_name: "هراوة", daira_name_ascii: "Rouiba", daira_name: "الرويبة", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1628", commune_name_ascii: "Birtouta", commune_name: "بئر توتة", daira_name_ascii: "Birtouta", daira_name: "بئر توتة", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1629", commune_name_ascii: "Tessala El Merdja", commune_name: "تسالة المرجة", daira_name_ascii: "Birtouta", daira_name: "بئر توتة", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1630", commune_name_ascii: "Ouled Chebel", commune_name: "اولاد شبل", daira_name_ascii: "Birtouta", daira_name: "بئر توتة", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1631", commune_name_ascii: "Sidi Moussa", commune_name: "سيدي موسى", daira_name_ascii: "Baraki", daira_name: "براقي", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1632", commune_name_ascii: "Baraki", commune_name: "براقي", daira_name_ascii: "Baraki", daira_name: "براقي", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },
    { id: "1633", commune_name_ascii: "Les Eucalyptus", commune_name: "الكاليتوس", daira_name_ascii: "Baraki", daira_name: "براقي", wilaya_code: "16", wilaya_name_ascii: "Alger", wilaya_name: "الجزائر" },

    // 17 Djelfa
    { id: "1701", commune_name_ascii: "Djelfa", commune_name: "الجلفة", daira_name_ascii: "Djelfa", daira_name: "الجلفة", wilaya_code: "17", wilaya_name_ascii: "Djelfa", wilaya_name: "الجلفة" },
    { id: "1702", commune_name_ascii: "Ain Oussera", commune_name: "عين وسارة", daira_name_ascii: "Ain Oussera", daira_name: "عين وسارة", wilaya_code: "17", wilaya_name_ascii: "Djelfa", wilaya_name: "الجلفة" },

    // 18 Jijel
    { id: "1801", commune_name_ascii: "Jijel", commune_name: "جيجل", daira_name_ascii: "Jijel", daira_name: "جيجل", wilaya_code: "18", wilaya_name_ascii: "Jijel", wilaya_name: "جيجل" },

    // 19 Setif
    { id: "1901", commune_name_ascii: "Setif", commune_name: "سطيف", daira_name_ascii: "Setif", daira_name: "سطيف", wilaya_code: "19", wilaya_name_ascii: "Setif", wilaya_name: "سطيف" },
    { id: "1902", commune_name_ascii: "El Eulma", commune_name: "العلمة", daira_name_ascii: "El Eulma", daira_name: "العلمة", wilaya_code: "19", wilaya_name_ascii: "Setif", wilaya_name: "سطيف" },

    // 20 Saida
    { id: "2001", commune_name_ascii: "Saida", commune_name: "سعيدة", daira_name_ascii: "Saida", daira_name: "سعيدة", wilaya_code: "20", wilaya_name_ascii: "Saida", wilaya_name: "سعيدة" },

    // 21 Skikda
    { id: "2101", commune_name_ascii: "Skikda", commune_name: "سكيكدة", daira_name_ascii: "Skikda", daira_name: "سكيكدة", wilaya_code: "21", wilaya_name_ascii: "Skikda", wilaya_name: "سكيكدة" },

    // 22 Sidi Bel Abbes
    { id: "2201", commune_name_ascii: "Sidi Bel Abbes", commune_name: "سيدي بلعباس", daira_name_ascii: "Sidi Bel Abbes", daira_name: "سيدي بلعباس", wilaya_code: "22", wilaya_name_ascii: "Sidi Bel Abbes", wilaya_name: "سيدي بلعباس" },

    // 23 Annaba
    { id: "2301", commune_name_ascii: "Annaba", commune_name: "عنابة", daira_name_ascii: "Annaba", daira_name: "عنابة", wilaya_code: "23", wilaya_name_ascii: "Annaba", wilaya_name: "عنابة" },
    { id: "2302", commune_name_ascii: "El Bouni", commune_name: "البوني", daira_name_ascii: "El Bouni", daira_name: "البوني", wilaya_code: "23", wilaya_name_ascii: "Annaba", wilaya_name: "عنابة" },

    // 24 Guelma
    { id: "2401", commune_name_ascii: "Guelma", commune_name: "قالمة", daira_name_ascii: "Guelma", daira_name: "قالمة", wilaya_code: "24", wilaya_name_ascii: "Guelma", wilaya_name: "قالمة" },

    // 25 Constantine
    { id: "2501", commune_name_ascii: "Constantine", commune_name: "قسنطينة", daira_name_ascii: "Constantine", daira_name: "قسنطينة", wilaya_code: "25", wilaya_name_ascii: "Constantine", wilaya_name: "قسنطينة" },
    { id: "2502", commune_name_ascii: "El Khroub", commune_name: "الخروب", daira_name_ascii: "El Khroub", daira_name: "الخروب", wilaya_code: "25", wilaya_name_ascii: "Constantine", wilaya_name: "قسنطينة" },

    // 26 Medea
    { id: "2601", commune_name_ascii: "Medea", commune_name: "المدية", daira_name_ascii: "Medea", daira_name: "المدية", wilaya_code: "26", wilaya_name_ascii: "Medea", wilaya_name: "المدية" },

    // 27 Mostaganem
    { id: "2701", commune_name_ascii: "Mostaganem", commune_name: "مستغانم", daira_name_ascii: "Mostaganem", daira_name: "مستغانم", wilaya_code: "27", wilaya_name_ascii: "Mostaganem", wilaya_name: "مستغانم" },

    // 28 M'Sila
    { id: "2801", commune_name_ascii: "M'Sila", commune_name: "المسيلة", daira_name_ascii: "M'Sila", daira_name: "المسيلة", wilaya_code: "28", wilaya_name_ascii: "M'Sila", wilaya_name: "المسيلة" },
    { id: "2802", commune_name_ascii: "Bou Saada", commune_name: "بوسعادة", daira_name_ascii: "Bou Saada", daira_name: "بوسعادة", wilaya_code: "28", wilaya_name_ascii: "M'Sila", wilaya_name: "المسيلة" },

    // 29 Mascara
    { id: "2901", commune_name_ascii: "Mascara", commune_name: "معسكر", daira_name_ascii: "Mascara", daira_name: "معسكر", wilaya_code: "29", wilaya_name_ascii: "Mascara", wilaya_name: "معسكر" },

    // 30 Ouargla
    { id: "3001", commune_name_ascii: "Ouargla", commune_name: "ورقلة", daira_name_ascii: "Ouargla", daira_name: "ورقلة", wilaya_code: "30", wilaya_name_ascii: "Ouargla", wilaya_name: "ورقلة" },
    { id: "3002", commune_name_ascii: "Hassi Messaoud", commune_name: "حاسي مسعود", daira_name_ascii: "Hassi Messaoud", daira_name: "حاسي مسعود", wilaya_code: "30", wilaya_name_ascii: "Ouargla", wilaya_name: "ورقلة" },

    // 31 Oran (More)
    { id: "3104", commune_name_ascii: "Arzew", commune_name: "أرزيو", daira_name_ascii: "Arzew", daira_name: "أرزيو", wilaya_code: "31", wilaya_name_ascii: "Oran", wilaya_name: "وهران" },
    { id: "3105", commune_name_ascii: "Ain Turk", commune_name: "عين الترك", daira_name_ascii: "Ain Turk", daira_name: "عين الترك", wilaya_code: "31", wilaya_name_ascii: "Oran", wilaya_name: "وهران" },

    // 32 El Bayadh
    { id: "3201", commune_name_ascii: "El Bayadh", commune_name: "البيض", daira_name_ascii: "El Bayadh", daira_name: "البيض", wilaya_code: "32", wilaya_name_ascii: "El Bayadh", wilaya_name: "البيض" },

    // 33 Illizi
    { id: "3301", commune_name_ascii: "Illizi", commune_name: "إليزي", daira_name_ascii: "Illizi", daira_name: "إليزي", wilaya_code: "33", wilaya_name_ascii: "Illizi", wilaya_name: "إليزي" },

    // 34 Bordj Bou Arreridj
    { id: "3401", commune_name_ascii: "Bordj Bou Arreridj", commune_name: "برج بوعريريج", daira_name_ascii: "Bordj Bou Arreridj", daira_name: "برج بوعريريج", wilaya_code: "34", wilaya_name_ascii: "Bordj Bou Arreridj", wilaya_name: "برج بوعريريج" },

    // 35 Boumerdes
    { id: "3501", commune_name_ascii: "Boumerdes", commune_name: "بومرداس", daira_name_ascii: "Boumerdes", daira_name: "بومرداس", wilaya_code: "35", wilaya_name_ascii: "Boumerdes", wilaya_name: "بومرداس" },
    { id: "3502", commune_name_ascii: "Boudouaou", commune_name: "بودواو", daira_name_ascii: "Boudouaou", daira_name: "بودواو", wilaya_code: "35", wilaya_name_ascii: "Boumerdes", wilaya_name: "بومرداس" },

    // 36 El Tarf
    { id: "3601", commune_name_ascii: "El Tarf", commune_name: "الطارف", daira_name_ascii: "El Tarf", daira_name: "الطارف", wilaya_code: "36", wilaya_name_ascii: "El Tarf", wilaya_name: "الطارف" },

    // 37 Tindouf
    { id: "3701", commune_name_ascii: "Tindouf", commune_name: "تندوف", daira_name_ascii: "Tindouf", daira_name: "تندوف", wilaya_code: "37", wilaya_name_ascii: "Tindouf", wilaya_name: "تندوف" },

    // 38 Tissemsilt
    { id: "3801", commune_name_ascii: "Tissemsilt", commune_name: "تيسمسيلت", daira_name_ascii: "Tissemsilt", daira_name: "تيسمسيلت", wilaya_code: "38", wilaya_name_ascii: "Tissemsilt", wilaya_name: "تيسمسيلت" },

    // 39 El Oued
    { id: "3901", commune_name_ascii: "El Oued", commune_name: "الوادي", daira_name_ascii: "El Oued", daira_name: "الوادي", wilaya_code: "39", wilaya_name_ascii: "El Oued", wilaya_name: "الوادي" },

    // 40 Khenchela
    { id: "4001", commune_name_ascii: "Khenchela", commune_name: "خنشلة", daira_name_ascii: "Khenchela", daira_name: "خنشلة", wilaya_code: "40", wilaya_name_ascii: "Khenchela", wilaya_name: "خنشلة" },

    // 41 Souk Ahras
    { id: "4101", commune_name_ascii: "Souk Ahras", commune_name: "سوق أهراس", daira_name_ascii: "Souk Ahras", daira_name: "سوق أهراس", wilaya_code: "41", wilaya_name_ascii: "Souk Ahras", wilaya_name: "سوق أهراس" },

    // 42 Tipaza
    { id: "4201", commune_name_ascii: "Tipaza", commune_name: "تيبازة", daira_name_ascii: "Tipaza", daira_name: "تيبازة", wilaya_code: "42", wilaya_name_ascii: "Tipaza", wilaya_name: "تيبازة" },
    { id: "4202", commune_name_ascii: "Cherchell", commune_name: "شرشال", daira_name_ascii: "Cherchell", daira_name: "شرشال", wilaya_code: "42", wilaya_name_ascii: "Tipaza", wilaya_name: "تيبازة" },

    // 43 Mila
    { id: "4301", commune_name_ascii: "Mila", commune_name: "ميلة", daira_name_ascii: "Mila", daira_name: "ميلة", wilaya_code: "43", wilaya_name_ascii: "Mila", wilaya_name: "ميلة" },
    { id: "4302", commune_name_ascii: "Chelghoum Laid", commune_name: "شلغوم العيد", daira_name_ascii: "Chelghoum Laid", daira_name: "شلغوم العيد", wilaya_code: "43", wilaya_name_ascii: "Mila", wilaya_name: "ميلة" },

    // 44 Ain Defla
    { id: "4401", commune_name_ascii: "Ain Defla", commune_name: "عين الدفلى", daira_name_ascii: "Ain Defla", daira_name: "عين الدفلى", wilaya_code: "44", wilaya_name_ascii: "Ain Defla", wilaya_name: "عين الدفلى" },
    { id: "4402", commune_name_ascii: "Khemis Miliana", commune_name: "خميس مليانة", daira_name_ascii: "Khemis Miliana", daira_name: "خميس مليانة", wilaya_code: "44", wilaya_name_ascii: "Ain Defla", wilaya_name: "عين الدفلى" },

    // 45 Naama
    { id: "4501", commune_name_ascii: "Naama", commune_name: "النعامة", daira_name_ascii: "Naama", daira_name: "النعامة", wilaya_code: "45", wilaya_name_ascii: "Naama", wilaya_name: "النعامة" },
    { id: "4502", commune_name_ascii: "Mecheria", commune_name: "المشرية", daira_name_ascii: "Mecheria", daira_name: "المشرية", wilaya_code: "45", wilaya_name_ascii: "Naama", wilaya_name: "النعامة" },

    // 46 Ain Temouchent
    { id: "4601", commune_name_ascii: "Ain Temouchent", commune_name: "عين تموشنت", daira_name_ascii: "Ain Temouchent", daira_name: "عين تموشنت", wilaya_code: "46", wilaya_name_ascii: "Ain Temouchent", wilaya_name: "عين تموشنت" },

    // 47 Ghardaia
    { id: "4701", commune_name_ascii: "Ghardaia", commune_name: "غرداية", daira_name_ascii: "Ghardaia", daira_name: "غرداية", wilaya_code: "47", wilaya_name_ascii: "Ghardaia", wilaya_name: "غرداية" },
    { id: "4702", commune_name_ascii: "Metlili", commune_name: "متليلي", daira_name_ascii: "Metlili", daira_name: "متليلي", wilaya_code: "47", wilaya_name_ascii: "Ghardaia", wilaya_name: "غرداية" },

    // 48 Relizane
    { id: "4801", commune_name_ascii: "Relizane", commune_name: "غليزان", daira_name_ascii: "Relizane", daira_name: "غليزان", wilaya_code: "48", wilaya_name_ascii: "Relizane", wilaya_name: "غليزان" },

    // -- NEW WILAYAS (2019/2021) --

    // 49 Timimoun (formerly part of Adrar)
    { id: "4901", commune_name_ascii: "Timimoun", commune_name: "تيميمون", daira_name_ascii: "Timimoun", daira_name: "تيميمون", wilaya_code: "49", wilaya_name_ascii: "Timimoun", wilaya_name: "تيميمون" },

    // 50 Bordj Badji Mokhtar (formerly part of Adrar)
    { id: "5001", commune_name_ascii: "Bordj Badji Mokhtar", commune_name: "برج باجي مختار", daira_name_ascii: "Bordj Badji Mokhtar", daira_name: "برج باجي مختار", wilaya_code: "50", wilaya_name_ascii: "Bordj Badji Mokhtar", wilaya_name: "برج باجي مختار" },

    // 51 Ouled Djellal (formerly part of Biskra)
    { id: "5101", commune_name_ascii: "Ouled Djellal", commune_name: "أولاد جلال", daira_name_ascii: "Ouled Djellal", daira_name: "أولاد جلال", wilaya_code: "51", wilaya_name_ascii: "Ouled Djellal", wilaya_name: "أولاد جلال" },

    // 52 Beni Abbes (formerly part of Bechar)
    { id: "5201", commune_name_ascii: "Beni Abbes", commune_name: "بني عباس", daira_name_ascii: "Beni Abbes", daira_name: "بني عباس", wilaya_code: "52", wilaya_name_ascii: "Beni Abbes", wilaya_name: "بني عباس" },

    // 53 In Salah (formerly part of Tamanrasset)
    { id: "5301", commune_name_ascii: "In Salah", commune_name: "عين صالح", daira_name_ascii: "In Salah", daira_name: "عين صالح", wilaya_code: "53", wilaya_name_ascii: "In Salah", wilaya_name: "عين صالح" },

    // 54 In Guezzam (formerly part of Tamanrasset)
    { id: "5401", commune_name_ascii: "In Guezzam", commune_name: "عين قزام", daira_name_ascii: "In Guezzam", daira_name: "عين قزام", wilaya_code: "54", wilaya_name_ascii: "In Guezzam", wilaya_name: "عين قزام" },

    // 55 Touggourt (formerly part of Ouargla)
    { id: "5501", commune_name_ascii: "Touggourt", commune_name: "تقرت", daira_name_ascii: "Touggourt", daira_name: "تقرت", wilaya_code: "55", wilaya_name_ascii: "Touggourt", wilaya_name: "تقرت" },

    // 56 Djanet (formerly part of Illizi)
    { id: "5601", commune_name_ascii: "Djanet", commune_name: "جانت", daira_name_ascii: "Djanet", daira_name: "جانت", wilaya_code: "56", wilaya_name_ascii: "Djanet", wilaya_name: "جانت" },

    // 57 El Meghaier (formerly part of El Oued)
    { id: "5701", commune_name_ascii: "El Meghaier", commune_name: "المغير", daira_name_ascii: "El Meghaier", daira_name: "المغير", wilaya_code: "57", wilaya_name_ascii: "El Meghaier", wilaya_name: "المغير" },

    // 58 El Meniaa (formerly part of Ghardaia)
    { id: "5801", commune_name_ascii: "El Meniaa", commune_name: "المنيعة", daira_name_ascii: "El Meniaa", daira_name: "المنيعة", wilaya_code: "58", wilaya_name_ascii: "El Meniaa", wilaya_name: "المنيعة" },
];

export function getCitiesByWilaya(wilayaCode: string) {
    return cities.filter(city => city.wilaya_code === wilayaCode);
}
