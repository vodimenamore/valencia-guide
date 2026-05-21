import { useState, useEffect, useCallback } from "react";

const SECTIONS = [
  { id: "history",  label: "History & architecture",  desc: "2,000 years in one city",      color: "#534AB7", bg: "#EEEDFE" },
  { id: "culture",  label: "Culture & events",        desc: "Festivals, art & nightlife",   color: "#CC4A00", bg: "#FFF2EA" },
  { id: "food",     label: "Food & drink",            desc: "What a local actually eats",   color: "#CC4A00", bg: "#FFF2EA"},
  { id: "nightlife",label: "Bars & nightlife",        desc: "Rooftops, clubs & late nights", color: "#2A1A4A", bg: "#EEEAF8" },
  { id: "beaches",  label: "Beaches & outdoors",      desc: "Sun, sand & the Turia garden", color: "#185FA5", bg: "#E6F1FB" },
  { id: "flora",    label: "Flora & trees",           desc: "The city's living landmarks",  color: "#2D6A2D", bg: "#E8F5E8" },
  { id: "kids",     label: "Kids & fun",              desc: "Valencia with little ones",    color: "#185FA5", bg: "#E6F1FB" },
  { id: "sports",   label: "Sports events",           desc: "Football, basketball & more",  color: "#CC4A00", bg: "#FFF2EA" },
  { id: "shopping", label: "Shopping & markets",      desc: "What to buy & where",          color: "#993556", bg: "#FBEAF0" },
  { id: "practical",label: "Practical tips",          desc: "How to move like a local",     color: "#5F5E5A", bg: "#F1EFE8" },
];

const CONTENT = {
  food: {
    insiderNote: "Real Valencian paella is made with rabbit and chicken — not seafood. Order it at lunch, never dinner. Restaurants that serve it at night are cooking for tourists.",
    items: [
      { name: "Paella valenciana", desc: "The original. Rice, rabbit, chicken, ferradura beans, rosemary. Best at La Pepica (Passeig Marítim) or Casa Roberto (Carrer Músic Amigó).", lat: 39.4603, lng: -0.3267, address: "Passeig Neptú, 2 (La Pepica)" },
      { name: "Horchata & fartons", desc: "Tiger-nut milk served cold. Go to Horchatería Santa Catalina in the old town — been there since 1836.", lat: 39.4753, lng: -0.3767, address: "Plaça de Santa Caterina, 6" },
      { name: "All i pebre", desc: "Eel in garlic and paprika sauce, from the Albufera lake. Try it at Restaurante El Palmar.", lat: 39.3350, lng: -0.3290, address: "El Palmar, Valencia" },
      { name: "Canalla Bistro", desc: "Ricard Camarena's casual spot. Creative sharing plates, buzzy atmosphere, book ahead.", lat: 39.4688, lng: -0.3826, address: "Carrer de Maestro José Serrano, 5" },
      { name: "Central Bar (Mercado Central)", desc: "Ricard Camarena's bar inside the market. Arrive at 9am for breakfast on a stool watching the market wake up.", lat: 39.4731, lng: -0.3797, address: "Plaça de la Reina, s/n" },
      { name: "Agua de Valencia", desc: "Valencia's iconic cocktail — fresh orange juice, cava, vodka and gin, served in a large shared jug. Invented in 1959 at Café Madrid by barman Constante Gil, reportedly after a group of Basque visitors challenged him to make something with Valencian character. Sweet, dangerously drinkable and deceptively strong. My pick for where to have it: Café de las Horas, a baroque-decorated gem in the old town — theatrical, beautiful and perfect for a long evening jug.", lat: 39.4771, lng: -0.3756, address: "Café de las Horas, Carrer del Comte d'Alacant, 1" },
      { name: "How to order coffee — & where", desc: "Café solo — short black espresso, strong and serious. Café con leche — espresso with equal part hot milk, the standard morning coffee. Cortado — a splash of milk to cut the bitterness. Café amb llet — the Valencian name for café con leche. Cremaet — the Valencian speciality: dark rum flambéed with coffee beans, lemon peel and cinnamon, mixed with coffee. Order it after a long lunch and you'll understand why siestas exist. My pick: Bar Cremaet on Avinguda del Port — a classic, no-frills local bar that does the cremaet properly.", address: "Bar Cremaet, Avinguda del Port, Valencia" },
    ],
  },
  history: {
    insiderNote: "Start at the Torres de Serranos at dawn — empty streets, golden light. The old town is best explored before 10am before tour groups arrive.",
    items: [
      { name: "La Lonja de la Seda", desc: "UNESCO silk exchange, 1482. Late Gothic masterpiece. The spiral columns inside are extraordinary. 🎟 €2 adults, €1 concessions (students, groups, pensioners). Free on Sundays and public holidays. Open daily 10am–7pm (weekdays), 10am–2pm (weekends).", lat: 39.4731, lng: -0.3797, address: "Carrer de la Llotja, 2" },
      { name: "Catedral de Valencia", desc: "Gothic, Baroque and Romanesque all at once. Allegedly holds the Holy Grail. Climb the Miguelete tower for 207 steps and panoramic views — not included in the main ticket. 🎟 Cathedral: €8 adults (includes audio guide), €6 concessions, free under 8. Miguelete Tower: €2 extra. Open Mon–Sat 10am–6:30pm, Sun 2–6:30pm.", lat: 39.4752, lng: -0.3751, address: "Plaça de la Reina, s/n" },
      { name: "Ciudad de las Artes y las Ciencias", desc: "Calatrava's futurist complex. Stunning at night. Free to walk around the exterior — the Hemisfèric reflection alone is worth it. Individual buildings require tickets. 🎟 Exterior: free. Oceanogràfic: €33.70 adults. Science Museum: included in combos. Triple combo (Oceanogràfic + Science Museum + Hemisfèric): €47.75 adults, valid 3 consecutive days. Book online for 10–15% discount.", lat: 39.4536, lng: -0.3487, address: "Av. del Professor López Piñero, 7" },
      { name: "Barrio del Carmen", desc: "Medieval quarter with Roman walls. Street art, tiny bars, and the best tapas crawl in the city. 🎟 Free to explore — it's a neighbourhood, not a ticketed site. Just walk in.", lat: 39.4772, lng: -0.3815, address: "Barrio del Carmen, Valencia" },
      { name: "Torres de Serranos", desc: "14th-century city gate. Climb to the top for a panoramic view of the old town. 🎟 €2 adults, €1 concessions. Free on Sundays and public holidays — the best day to visit. Open Tue–Sat 10am–7pm, Sun & holidays 10am–2pm.", lat: 39.4789, lng: -0.3779, address: "Plaça dels Furs, s/n" },
      { name: "Palau de les Arts Reina Sofía", desc: "Calatrava's opera house that looks like a giant helmet. Even if you don't go in, walk around it at sunset — the exterior is free. Guided tours of the interior run Mon–Sat. 🎟 Exterior: free. Guided interior tour: check lesarts.com for current pricing (approx. €10–12). Opera and concert tickets vary — book well in advance for major productions.", lat: 39.4555, lng: -0.3512, address: "Av. del Professor López Piñero, 1" },
    ],
  },
  culture: {
    insiderNote: "Fallas in March is the real Valencia — five days of fire, gunpowder and sleep deprivation. For the rest of the year, Ruzafa and El Carmen are where the cultural energy lives.",
    items: [
      { name: "Joaquín Sorolla", desc: "Valencia's greatest painter, born here in 1863. His work is defined by Mediterranean light — dazzling beach scenes, fishing families, children playing in the surf at Malvarrosa. Walk those same beaches and you'll immediately understand his palette. The Museo de Bellas Artes (Free) has an entire Sorolla room. His house-museum in Madrid holds the largest collection, but Valencia is where you feel him most — a ceramic plaque marks his birthplace near the cathedral.", address: "Museu de Belles Arts, Carrer de Sant Pius V, 9" },
      { name: "Ignacio Pinazo Camarlench", desc: "Sorolla's teacher and the father of Valencian Impressionism — less famous internationally, but arguably just as important. Born in Valencia in 1849 to a poor family, he worked as a silversmith and tile painter before studying at the San Carlos Academy. His loose, intimate style was ahead of its time. IVAM holds a large collection of his works.", address: "IVAM, Carrer de Guillem de Castro, 118" },
      { name: "Museo de Bellas Artes de Valencia", desc: "Free entry, and one of the finest art museums in Spain — criminally undervisited. Works by Sorolla, Pinazo, El Greco, Velázquez, Goya, Van Dyck and more. Set in a stunning former convent next to the Jardines del Real. The courtyard café is one of the best-kept secrets in the city.", address: "Carrer de Sant Pius V, 9 — free entry" },
      { name: "Centre d'Art Hortensia Herrero", desc: "Opened in 2023 inside the beautifully restored 17th-century Palau de Valeriola in the heart of the old town. Houses over 100 works from Hortensia Herrero's private collection — Anish Kapoor, Anselm Kiefer, Georg Baselitz, Olafur Eliasson, Roy Lichtenstein, Jaume Plensa and Valencian artists Manolo Valdés and Andreu Alfaro. Some pieces were created specifically for the building. The basement reveals remains of Valencia's Roman circus beneath the gallery floor. One of the most exciting new cultural spaces in Spain.", address: "Carrer de Valeriola, 13" },
      { name: "Fundación Bancaja", desc: "A large private cultural foundation in a grand late-19th century building on Plaza de Tetuán. Strong programme of temporary exhibitions focused on Spanish and Valencian art — past shows have featured Sorolla, Pinazo, Picasso, Francis Bacon and Equipo Crónica. Also holds a permanent contemporary art space (E.ac.) in its domed hall. Free entry to most exhibitions; Tue–Sun 10am–2pm and 4:30–8:30pm.", address: "Plaça de Tetuan, 23 — fundacionbancaja.es" },
      { name: "Museo Nacional de Cerámica González Martí", desc: "Ceramics is Valencia's oldest and most important craft tradition — Manises and Paterna tiles have been made here since the medieval period. This national museum, housed in the extraordinary Palace of the Marqués de Dos Aguas, tells the whole story. The Rococo alabaster façade alone is one of the most dramatic doorways in Spain. Inside: 14,800 ceramic pieces from prehistory to Picasso, plus 18th-century carriages and opulent palace rooms. Free for under-18s and over-65s.", address: "Carrer del Poeta Querol, 2" },
      { name: "IVAM (Institut Valencià d'Art Modern)", desc: "Valencia's contemporary art museum. Strong rotating exhibitions, excellent permanent collection of Valencian avant-garde. The best place to discover living Valencian artists alongside international names.", address: "Carrer de Guillem de Castro, 118" },
      { name: "Fallas Museum (Museu Faller)", desc: "The ninots (figures) saved from the annual bonfire by public vote. Bizarre, brilliant and unlike anything else — monumental satirical sculptures in papier-mâché, some dating back decades. Essential for understanding the city's culture and dark humour.", address: "Plaça de Monteolivete, 4" },
      { name: "Palau de la Música", desc: "Classical concerts by the River Turia. Affordable tickets, superb acoustics. Check their programme — the resident orchestra is excellent and visiting ensembles are frequent.", address: "Passeig de l'Albereda, 30" },
    ],
  },
  beaches: {
    insiderNote: "Malvarrosa is the famous one, but locals go to Cabanyal or El Saler for fewer crowds. The Turia garden — a dry riverbed turned into a 9km park — is the city's true outdoor living room.",
    items: [
      { name: "Playa de la Malvarrosa", desc: "The city beach. Wide, long, well-serviced. Crowded in August — go early morning or visit in May/June when it's perfect.", lat: 39.4775, lng: -0.3195, address: "Passeig Marítim de la Malvarrosa" },
      { name: "Playa del Cabanyal", desc: "Just north of Malvarrosa, slightly less busy, and next to one of Valencia's most interesting barrios.", lat: 39.4800, lng: -0.3220, address: "Playa del Cabanyal, Valencia" },
      { name: "El Saler beach", desc: "30 min south of the city, backed by pine forest and the Albufera lagoon. The best beach near Valencia.", lat: 39.3250, lng: -0.3167, address: "El Saler, Valencia" },
      { name: "Jardí del Turia", desc: "9km of park in the old river bed. Cycle, run, or just walk from the City of Arts to the Torres de Serranos.", lat: 39.4700, lng: -0.3700, address: "Jardí del Turia, Valencia" },
      { name: "La Albufera", desc: "Freshwater lagoon 20min south. Boat trip at sunset, then dinner in El Palmar. This is where Valencian rice culture was born.", lat: 39.3333, lng: -0.3500, address: "Parc Natural de l'Albufera" },
      { name: "Cycling — Sierra Calderona", desc: "The natural park just north of the city is one of the best cycling areas in Spain — quiet roads, cork oak and pine forests, red sandstone cliffs, and climbs that reward you with views of the sea. Road cyclists love the ascents to El Garbí and El Oronet (82km from Valencia, +670m elevation, medium difficulty — passing through the villages of Náquera and Serra). Mountain bikers and gravel riders have a wide network of fire roads and singletracks — the Fuentes de Serra circular (around 34km, +500m) is a popular moderate route with great viewpoints. All rideable year-round thanks to the mild climate. Get to the starting villages by car (30–40min from Valencia) or regional bus to Serra. Routes and GPX files at komoot.com or cyclingcalderona.com.", address: "Sierra Calderona Natural Park — Serra, Náquera, Olocau" },
    ],
  },
  practical: {
    insiderNote: "The EMT buses and metro cover everything. For the Turia garden, rent a Valenbisi bike — stations are all over the city and it's the best way to travel the length of the park.",
    items: [
      { name: "Getting around", desc: "Metro lines 3 & 5 cover most of the city. EMT buses for everywhere else. Valenbisi bike hire is excellent and cheap for the Turia path.", address: "Valencia city centre" },
      { name: "How to get an EMT bus card", desc: "The Bonobus is what you want: 10 trips on any EMT city bus, with free transfers within 1 hour of first tapping. It costs €8.50, plus a one-time €2 for the reusable Móbilis plastic card. Buy both at any estanco (tobacco shop) or newsstand kiosk — they're everywhere. Top it up at the same places, at emtvalencia.es, or via the EMTValencia app. Single trip without a card: pay €2 cash to the driver, or use the EMTicket app for a 1-hour unlimited transfer ticket. For short visits covering buses, metro and tram together, the Valencia Tourist Card is worth it: 24h (€15), 48h (€20), 72h (€25) — includes free entry to municipal museums. Collect it at the airport, tourist offices, or self-service kiosks around the city.", address: "Any estanco (tobacco shop) or kiosk" },
      { name: "Getting to the beach", desc: "Three easy options from the city centre. Tram (line 4): runs from Pont de Fusta along the coast all the way to Malvarrosa and beyond — about 20 minutes, cheap and scenic. Bus: EMT lines 19, 31 and 32 go directly to Malvarrosa beach from the city centre. Bike: the dedicated cycle path through the Turia garden and down to the seafront takes about 30 minutes and is flat all the way — the best option on a good day. Taxi or Cabify: 10–15 minutes from the centre, around €8–10.", address: "Tram line 4 from Pont de Fusta" },
      { name: "Getting to the airport", desc: "Metro line 3 and line 5 both connect the city centre directly to the airport (Aeroport stop). Journey time is about 25 minutes from Xàtiva station (near the old town). Runs frequently from around 5:30am to midnight. Single ticket costs €4.90 including the airport supplement — buy at any metro station. Taxi from the centre takes 15–20 minutes and costs around €18–22 depending on traffic. No airport buses currently run from the city centre — the metro is by far the easiest and cheapest option.", address: "Metro lines 3 & 5 — Aeroport stop" },
      { name: "Eating times", desc: "Lunch is sacred: 14:00–16:00. Dinner doesn't start until 21:30. Eating at 19:00 marks you as a tourist. Menú del día (set lunch) is 12–14€ and always the best value.", address: "Valencia, Spain" },
    ],
  },
  shopping: {
    insiderNote: "Avoid the chain shops around Calle Colón. The good stuff is in Ruzafa (independent boutiques), the Mercado Central (produce and local food), and the old town streets around the cathedral.",
    items: [
      { name: "Mercado Central", desc: "1928 Modernista market, one of Europe's largest. Come before 13:00 for the full experience. Buy the local smoked paprika and dried herbs.", lat: 39.4731, lng: -0.3797, address: "Plaça de la Ciutat de Bruges, s/n" },
      { name: "Mercado de Colón", desc: "1916 market building, now full of upscale food stalls and cafes. Great for breakfast or a vermouth stop.", lat: 39.4705, lng: -0.3712, address: "Carrer de Jorge Juan, 19" },
      { name: "El Corte Inglés", desc: "Spain's iconic department store — think Harrods but more democratic. Valencia has four locations; the main one on Calle Colón/Pintor Sorolla is the most central and has everything: fashion, electronics, homeware, a supermarket, and the Club del Gourmet on the ground floor for the best Spanish food products in the city. Non-EU visitors get 10% back with the Reward Card. Open Mon–Sat 10am–10pm.", address: "Carrer del Pintor Sorolla, 26 (main store)" },
      { name: "Scalpers & Silbon — Spanish brands worth knowing", desc: "Two of the best Spanish fashion brands and both well-represented in Valencia. Scalpers (founded in Seville) does sharp, Mediterranean-inflected menswear — tailored but relaxed, great quality for the price. Silbon (from Córdoba) is similar territory: clean, elegant Spanish prep. Both have standalone stores in the city and concessions in El Corte Inglés. Good alternatives to the usual international chains if you want to take something genuinely Spanish home.", address: "Various locations — also in El Corte Inglés and Bonaire" },
      { name: "Centro Comercial Bonaire", desc: "One of the largest shopping centres in Spain, 15 minutes west of Valencia on the A-3. Over 120 stores including Zara, H&M, Primark, Mango, Scalpers, Massimo Dutti, Levi's and more — plus 30 restaurants on the outdoor Las Terrazas terrace. Good for a rainy day or when you want everything in one place. Also has a cinema, bowling alley and climbing wall. Note: the centre was severely damaged by the DANA floods in October 2024 and reopened in February 2025 — most stores are back, but check before visiting.", address: "Ctra. A-3, salida 345, Aldaia" },
      { name: "Lladró factory store", desc: "The famous Valencian porcelain. The outlet in Tavernes Blanques has better prices than the city shops.", lat: 39.5158, lng: -0.3728, address: "Carrer de la Mare de Déu, s/n, Tavernes Blanques" },
      { name: "Ruzafa boutiques", desc: "Carrer de Cadis and surrounding streets. Independent fashion, ceramics, design objects. Valencia's answer to a creative quarter.", lat: 39.4628, lng: -0.3763, address: "Carrer de Cadis, Ruzafa" },
      { name: "Ceramics & azulejos", desc: "Manises, 15min west by metro, is Valencia's ceramics town. Buy traditional hand-painted tiles directly from the workshops.", lat: 39.4878, lng: -0.4536, address: "Manises, Valencia" },
      { name: "Ale-Hop", desc: "A Spanish chain that's become something of a cult — part gift shop, part gadget store, part organised chaos. Sells everything from quirky souvenirs and novelty items to useful travel accessories, stationery and design objects, all at very low prices. Great for picking up small gifts to take home. There are several locations in Valencia city centre.", address: "Multiple locations in Valencia city centre" },
    ],
  },
  nightlife: {
    insiderNote: "Valencians go out late — seriously late. Dinner at 22:00, first drinks at midnight, clubs fill up after 2am. Don't turn up to a club at midnight expecting a crowd; you'll be alone. The two main nightlife barrios are El Carmen (older, more historic, mixed crowd) and Ruzafa (younger, more alternative, locals). Beach clubs run June–September only.",
    items: [
      { name: "Ateneo Sky Bar", desc: "The best rooftop in the city centre — 360° views from atop the historic Ateneo Mercantil building, looking straight over Plaza del Ayuntamiento. Cathedral spires, the Miguelete tower, the whole medieval skyline. Creative cocktails, elegant atmosphere. Book a sunset table in advance.", address: "Plaza del Ayuntamiento, 18 (rooftop)" },
      { name: "270º Bar — Barceló Valencia", desc: "L-shaped rooftop terrace above the Barceló hotel, between the city and the sea, with views over the Ciudad de las Artes y las Ciencias in three directions. The strawberry daiquiri is famous. More relaxed than the city-centre rooftops — good for a long afternoon drink turning into evening.", address: "Av. de França, 11 (rooftop)" },
      { name: "Blanq Carmen Rooftop", desc: "Boutique rooftop in the heart of El Carmen, with stunning views of the Torres de Serranos lit up at night. Small pool, stylish crowd, chic and modern. One of the most photogenic rooftops in Valencia. Busy on weekends — arrive early or book.", address: "Carrer del Museu, 8 (rooftop)" },
      { name: "L'Umbracle Terraza", desc: "An outdoor nightclub inside the City of Arts and Sciences complex — a planted walkway transformed into one of Valencia's most theatrical party spaces. DJ nights from Thursday to Saturday in summer. Surrounded by Calatrava's architecture with the Hemisfèric reflecting in the water nearby. Unmissable on a warm evening.", address: "Av. del Professor López Piñero, s/n" },
      { name: "OVEN Club", desc: "The best electronic music club in Valencia, in Ruzafa. Funktion-One sound system, serious underground lineups — deep techno, minimal, house. Open Thursday to Saturday. In summer they run outdoor Oven Gardens parties in the Turia garden bed. The crowd is local and knowledgeable. Don't arrive before 2am.", address: "Carrer de Dénia, 44, Ruzafa" },
      { name: "Jimmy Glass Jazz Bar", desc: "A tiny, legendary jazz bar in El Carmen. One of the best jazz bars in Spain — serious programming, intimate space, exceptional sound. Standing room only most nights. Come for the music, not the drinks. Check their programme in advance; it books out.", address: "Carrer de Bany dels Pavesos, 28, El Carmen" },
      { name: "Radio City", desc: "An El Carmen institution — live music, eclectic programming, salsa nights, funk, soul and occasional flamenco. Been going since the 1980s. Small, hot, sweaty and brilliant. The kind of place you end up dancing whether you planned to or not.", address: "Carrer de Santa Teresa, 19, El Carmen" },
      { name: "La Marina Beach Club", desc: "The most exclusive beach club in Valencia, at the old America's Cup marina. Stunning waterfront setting, cocktails, DJs, and a crowd that dresses up. Summer only — June to September. Expect to pay more than the city bars, but the setting earns it.", address: "Marina de Valencia, Moll de la Duana" },
    ],
  },
  kids: {
    insiderNote: "Valencia is genuinely one of the best cities in Spain for kids — flat, safe, outdoor-friendly and full of free or cheap things to do. Avoid August if you can: the heat is brutal for small children in the afternoon. April–June and September–October are the sweet spot.",
    items: [
      { name: "Oceanogràfic", desc: "Europe's largest aquarium, inside the City of Arts and Sciences. Sharks, beluga whales, dolphins, penguins, jellyfish — spread across outdoor pavilions so it never feels overwhelming. Book tickets online in advance, the queue on the day is long.", address: "Av. del Professor López Piñero, 5" },
      { name: "Gulliver Park (Parc de Gulliver)", desc: "A giant Gulliver lying in the Turia garden, his body turned into slides, tunnels and climbing ramps. Completely free, one of the most original playgrounds in Europe. Go early in summer — the plastic surfaces get scalding hot by midday and there's no shade.", address: "Jardí del Turia, Valencia" },
      { name: "Bioparc Valencia", desc: "A zoo with no visible barriers — animals live in recreated African habitats and you walk through them. Gorillas, elephants, lions, hippos. Much better than a traditional zoo. Half a day is enough; it's at the western end of the Turia garden.", address: "Av. Pío Baroja, 3" },
      { name: "Museu de les Ciències (Science Museum)", desc: "Hands-on interactive science museum in Calatrava's stunning skeleton building. Kids can touch and experiment with everything. Shows are in Spanish but most exhibits are physical and language-independent. Combine with Oceanogràfic next door.", address: "Av. del Professor López Piñero, 1" },
      { name: "Turia garden bike ride", desc: "Rent a family bike — cargo bikes, child seats and tag-alongs all available — and ride the full 9km from Bioparc to the City of Arts and Sciences. Completely car-free, flat, and lined with playgrounds. Stop at Gulliver halfway. The best free afternoon in Valencia.", address: "Jardí del Turia (rent near Torres de Serranos)" },
      { name: "Aquopolis Cullera", desc: "Water park 45min south of Valencia by car or train, on the coast. Slides, wave pool, children's areas. The goto option on a hot summer day when the beach isn't enough. Check opening dates — usually June to September only.", address: "Urbanización El Dorado, Cullera" },
      { name: "Kids eat free here", desc: "Spanish restaurants are genuinely child-friendly — kids are welcome everywhere, at any hour. Most places have a menú infantil (children's menu) for 6–8€. Portions for adults are large enough to share. Don't stress about finding 'family restaurants' — any neighbourhood place will make your kids feel welcome.", address: "Anywhere in Valencia" },
      { name: "Learn to ride a bike — Jardines del Real (Viveros)", desc: "The Jardines del Real, known locally as Viveros, has a dedicated children's cycling area — a small traffic circuit with mini roads, signs and roundabouts where kids can practise riding bikes in a safe, car-free environment. Completely free. Bikes are not provided on site, but there are rental shops nearby in the Turia garden. A lovely morning activity combined with a walk through the gardens and a stop at the playground inside the park.", address: "Jardines del Real (Viveros), Carrer de Sant Pius V" },
    ],
  },
  flora: {
    insiderNote: "Valencia has one of the most remarkable collections of urban trees in Spain — many planted by returning emigrants in the 19th century who brought exotic species back from South America and Australia. Most visitors walk straight past them. Learn to look up.",
    items: [
      { name: "Passeig de l'Albereda (La Alameda)", desc: "The city's grand promenade along the old Turia riverbed, open since 1677. A 1km corridor of Australian banyans, false pepper trees, California palms, holm oaks and jacarandas. The 2002 gardens behind the Palau de la Música contain a curated collection of every plant species in the Valencian Community, pruned into geometric shapes. Walk it slowly.", address: "Passeig de l'Albereda, Valencia" },
      { name: "Jacaranda (Jacaranda mimosifolia)", desc: "The purple tree. Native to South America, it explodes into violet-lilac blossom in April–May before its leaves appear, carpeting the streets below in purple. The best concentrations are around Plaza del Carmen, La Glorieta and Avinguda Menéndez Pelayo. One of the most photographed sights in Valencia in spring — and completely free.", address: "Plaza del Carmen / La Glorieta, Valencia" },
      { name: "Árbol botella — El Bosc del Palo Borracho", desc: "The bottle tree (Ceiba speciosa). Native to the subtropical forests of South America, in the same family as the baobab. The trunk swells at the base to store water during drought and is covered in thick spines. In winter the bare, spiny green trunks look almost prehistoric. In summer, huge pink and white flowers with yellow centres, up to 20cm wide. There is a small grove of them in the Jardí del Turia — locals call it El Bosc del Palo Borracho (Forest of the Drunken Sticks).", address: "Jardí del Turia, near Pont de les Flors" },
      { name: "The Great Ficus of El Parterre", desc: "Planted in 1852 by mistake — a gardener confused it with a magnolia. It is now 24 metres tall with roots so powerful they forced a nearby petrol station to close and relocate in 2019. It has survived the Spanish Civil War, Franco's dictatorship and the catastrophic 1957 flood, when water nearly reached its canopy. The most monumental tree in the city centre. Find it in the small garden of El Parterre, near the Porta de la Mar.", address: "Jardins del Parterre, Porta de la Mar" },
      { name: "Ficus macrophylla — La Glorieta & Jardines del Real", desc: "Moreton Bay figs from Australia, with vast aerial roots that spread across the ground like frozen rivers. The specimens in La Glorieta and the Jardines del Real (Viveros) are among the oldest in the city. Stand underneath one and look up — the canopy is extraordinary.", address: "La Glorieta / Jardines del Real (Viveros)" },
      { name: "Judas trees — Avinguda Menéndez Pelayo", desc: "The Cercis siliquastrum, native to the Mediterranean. In March–April the bare branches burst into vivid magenta-pink blossom before any leaves appear, giving the impression the tree itself is flowering from the wood. Walk this avenue in spring and you'll understand why it's called the Judas tree — the flowers appear suddenly, as if from nowhere.", address: "Avinguda Menéndez Pelayo, Valencia" },
      { name: "Orange trees — the city's own fruit", desc: "The bitter orange (Citrus aurantium) lines streets throughout the old town. These are not eating oranges — they're intensely bitter and used commercially for marmalade and perfume (Seville orange oil). Every January the city harvests thousands of kilos from the street trees and sells them to Seville for export. In blossom (February–March) the scent of azahar (orange blossom) fills the entire old town. One of the defining sensory experiences of Valencia.", address: "Throughout the old town — especially Carrer de la Pau" },
      { name: "Jardí Botànic de la Universitat de València", desc: "Founded in 1567, one of the oldest botanical gardens in Spain. 45,000 square metres with over 3,500 plant species from around the world. A quiet, uncrowded alternative to the main parks. The cactus and succulent greenhouses alone are worth the visit. Entry is just €2.50.", address: "Carrer de Quart, 80, Valencia" },
    ],
  },
  sports: {
    insiderNote: "Valencia punches well above its weight for a city its size — a La Liga football club, one of Europe's top basketball teams, and the season finale of MotoGP all within 20km. Checking what's on during your visit is always worth doing.",
    items: [
      { name: "Valencia CF — Mestalla", desc: "One of the great football grounds in Europe. The Telegraph ranked it second greatest stadium in European football — the steepest stands of any major ground, creating an atmosphere unlike anywhere else. Built in 1923, capacity 55,000. Tickets range from around €15 for smaller games to €60+ for Barcelona or Real Madrid. Buy direct at valenciacf.com. The Mestalla Forever Tour runs most days (from €9) — you walk through the dressing room and out through the tunnel to the pitch. Note: a new stadium (Nou Mestalla) is under construction and targeted to open 2027.", address: "Av. de Suècia, s/n — valenciacf.com" },
      { name: "Valencia Basket — Roig Arena", desc: "One of the best basketball clubs in Europe, competing in both the Liga Endesa and EuroLeague. They have both men's and women's teams at the top level — the women's team is among the strongest in continental basketball. The Roig Arena is their new home, a state-of-the-art venue. Atmosphere is electric for EuroLeague nights. Tickets are very affordable compared to football — check valenciabasket.com for the schedule.", address: "Roig Arena — valenciabasket.com" },
      { name: "MotoGP Grand Prix of Valencia", desc: "The season finale of the MotoGP World Championship, held every November at Circuit Ricardo Tormo in Cheste, 20km west of the city. Named after Ricardo Tormo, a two-time 50cc world champion from Valencia who died young. More championships have been decided at this circuit than any other — it's where seasons end and legends are made. The stadium-style layout means you can see most of the track from a single spot. The 2026 race is scheduled for 22 November.", address: "Circuit Ricardo Tormo, Cheste (20km west)" },
      { name: "Levante UD — Estadio Ciutat de València", desc: "Valencia's second football club and fierce local rivals. The Derbi del Turia — Valencia CF vs Levante — is one of the most passionate city derbies in Spain. Levante play in the lower divisions but the stadium atmosphere is intense and tickets are easy to get. A more authentic, less touristy football experience than Mestalla.", address: "Carrer del Lluís Casanova, 57 — levanteud.com" },
      { name: "Valencia Marathon", desc: "Held every December, consistently rated one of the fastest marathon courses in the world and a major event on the global running calendar. The flat city route passes Mestalla, the City of Arts and Sciences and the seafront. Even if you're not running, the finish line atmosphere on race day is worth seeing.", address: "Finish line: Ciutat de les Arts i les Ciències" },
      { name: "Formula E & motorsport at Ricardo Tormo", desc: "Beyond MotoGP, the Circuit Ricardo Tormo hosts Formula E pre-season testing (usually October–November, often free to spectators), GT racing, NASCAR, and various other motor events throughout the year. Check circuitovalencia.com for the full calendar — some events are free or very cheap to attend.", address: "Circuit Ricardo Tormo, Cheste — circuitovalencia.com" },
    ],
  },
};

const CARD_SVGS = {
food: (
  <img
    src="https://res.cloudinary.com/dntf51gis/image/upload/v1779374189/Gemini_Generated_Image_bsla9ybsla9ybsla_gh6hpc.png"
    style={{position:"absolute",inset:0,width:"100%",
    height:"100%",objectFit:"cover",filter:"brightness(0.85)"}}
    alt=""
  />
),
  nightlife: (
     <img
    src="https://res.cloudinary.com/dntf51gis/image/upload/v1779377918/Gemini_Generated_Image_wevd3dwevd3dwevd_uua7u2.png"
    style={{position:"absolute",inset:0,width:"100%",
    height:"100%",objectFit:"cover",filter:"brightness(0.85)"}}
    alt=""
  />
  ),
history: (
  <img
    src="https://res.cloudinary.com/dntf51gis/image/upload/v1779374065/Gemini_Generated_Image_ui7t96ui7t96ui7t_aaegwy.png"
    style={{position:"absolute",inset:0,width:"100%",
    height:"100%",objectFit:"cover",filter:"brightness(0.85)"}}
    alt=""
  />
),
culture: (
  <img
    src="https://res.cloudinary.com/dntf51gis/image/upload/v1779374321/Gemini_Generated_Image_fl5isqfl5isqfl5i_gjtd4m.png"
    style={{position:"absolute",inset:0,width:"100%",
    height:"100%",objectFit:"cover",filter:"brightness(0.85)"}}
    alt=""
  />
),
  beaches: (
    <img
    src="https://res.cloudinary.com/dntf51gis/image/upload/v1779374621/Gemini_Generated_Image_agdogoagdogoagdo_qimvgu.png"
    style={{position:"absolute",inset:0,width:"100%",
    height:"100%",objectFit:"cover",filter:"brightness(0.85)"}}
    alt=""
  />
  ),
    kids: (
     <img
    src="https://res.cloudinary.com/dntf51gis/image/upload/v1779377322/Gemini_Generated_Image_m2s62mm2s62mm2s6_ezvx9b.png"
    style={{position:"absolute",inset:0,width:"100%",
    height:"100%",objectFit:"cover",filter:"brightness(0.85)"}}
    alt=""
  />
  ),
  practical: (
      <img
    src="https://res.cloudinary.com/dntf51gis/image/upload/v1779375209/Gemini_Generated_Image_17tfra17tfra17tf_r2jxx6.png"
    style={{position:"absolute",inset:0,width:"100%",
    height:"100%",objectFit:"cover",filter:"brightness(0.85)"}}
    alt=""
  />
  ),
  shopping: (
    <img
    src="https://res.cloudinary.com/dntf51gis/image/upload/v1779375020/Gemini_Generated_Image_wdos3zwdos3zwdos_lbsgcv.png"
    style={{position:"absolute",inset:0,width:"100%",
    height:"100%",objectFit:"cover",filter:"brightness(0.85)"}}
    alt=""
  />
  ),

  flora: (
    <img
    src="https://res.cloudinary.com/dntf51gis/image/upload/v1779378094/Gemini_Generated_Image_7xxik47xxik47xxi_aplppd.png"
    style={{position:"absolute",inset:0,width:"100%",
    height:"100%",objectFit:"cover",filter:"brightness(0.85)"}}
    alt=""
  />
  ),
  sports: (
  <img
    src="https://res.cloudinary.com/dntf51gis/image/upload/v1779375358/Gemini_Generated_Image_rhbyn6rhbyn6rhby_olount.png"
    style={{position:"absolute",inset:0,width:"100%",
    height:"100%",objectFit:"cover",filter:"brightness(0.85)"}}
    alt=""
  />
  ),
};

const MosaicStrip = ({ height = 14, opacity = 1 }) => (
  <svg viewBox="0 0 400 18" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
    style={{ display:'block', width:'100%', height, opacity }}>
    {/* row of irregular mosaic patches with dark grout lines between */}
    <rect width="400" height="18" fill="#1A0A00"/>
    {/* patch colours from the photo: reds, greens, blues, yellows, purples, terracotta */}
    <path d="M0 0 L28 0 L32 9 L22 18 L0 18Z" fill="#C8231A"/>
    <path d="M28 0 L55 0 L58 14 L32 9Z" fill="#E8A020"/>
    <path d="M55 0 L80 0 L75 18 L58 14Z" fill="#2E7D32"/>
    <path d="M80 0 L108 0 L112 10 L75 18Z" fill="#1565A8"/>
    <path d="M108 0 L130 0 L128 18 L112 10Z" fill="#8B1A1A"/>
    <path d="M130 0 L158 0 L155 12 L128 18Z" fill="#CC4A00"/>
    <path d="M158 0 L182 0 L185 18 L155 12Z" fill="#4A148C"/>
    <path d="M182 0 L210 0 L208 10 L185 18Z" fill="#E8C820"/>
    <path d="M210 0 L235 0 L230 18 L208 10Z" fill="#1B5E20"/>
    <path d="M235 0 L262 0 L265 14 L230 18Z" fill="#B71C1C"/>
    <path d="M262 0 L288 0 L285 18 L265 14Z" fill="#0D47A1"/>
    <path d="M288 0 L314 0 L318 10 L285 18Z" fill="#FF6C0C"/>
    <path d="M314 0 L338 0 L335 18 L318 10Z" fill="#5E2750"/>
    <path d="M338 0 L365 0 L362 12 L335 18Z" fill="#2E7D32"/>
    <path d="M365 0 L400 0 L400 18 L362 12Z" fill="#C8231A"/>
    {/* second row overlapping from bottom */}
    <path d="M0 18 L22 18 L32 9 L0 6Z" fill="#1B5E20" opacity="0.7"/>
    <path d="M75 18 L112 10 L100 5 L65 8Z" fill="#880E4F" opacity="0.6"/>
    <path d="M155 12 L185 18 L195 10 L168 5Z" fill="#E8A020" opacity="0.7"/>
    <path d="M230 18 L265 14 L255 6 L222 9Z" fill="#1565A8" opacity="0.6"/>
    <path d="M335 18 L362 12 L375 5 L348 3Z" fill="#4A148C" opacity="0.7"/>
    {/* grout lines - thin dark paths between patches */}
    <path d="M28 0 L32 9 L22 18" fill="none" stroke="#1A0A00" strokeWidth="1.5"/>
    <path d="M55 0 L58 14 L75 18" fill="none" stroke="#1A0A00" strokeWidth="1.5"/>
    <path d="M80 0 L112 10 L128 18" fill="none" stroke="#1A0A00" strokeWidth="1.5"/>
    <path d="M130 0 L128 18" fill="none" stroke="#1A0A00" strokeWidth="1.5"/>
    <path d="M158 0 L155 12 L185 18" fill="none" stroke="#1A0A00" strokeWidth="1.5"/>
    <path d="M182 0 L208 10 L230 18" fill="none" stroke="#1A0A00" strokeWidth="1.5"/>
    <path d="M210 0 L265 14" fill="none" stroke="#1A0A00" strokeWidth="1.5"/>
    <path d="M235 0 L230 18" fill="none" stroke="#1A0A00" strokeWidth="1.5"/>
    <path d="M262 0 L285 18" fill="none" stroke="#1A0A00" strokeWidth="1.5"/>
    <path d="M288 0 L318 10 L335 18" fill="none" stroke="#1A0A00" strokeWidth="1.5"/>
    <path d="M314 0 L362 12" fill="none" stroke="#1A0A00" strokeWidth="1.5"/>
    <path d="M338 0 L400 8" fill="none" stroke="#1A0A00" strokeWidth="1.5"/>
  </svg>
);


const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --taronja-dark: #CC4A00;
    --taronja-mid: #FF6C0C;
    --taronja-light: #FFF2EA;
    --taronja-text: #7A2800;
    --cream: #FFFBF7;
    --ink: #1A1714;
    --muted: #6B6660;
    --border: rgba(0,0,0,0.08);
  }
  body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--ink); }
  .app { max-width: 430px; margin: 0 auto; min-height: 100vh; background: var(--cream); position: relative; }
  .header { background: #CC4A00; padding: 48px 20px 28px; position: relative; overflow: hidden; }
  .header::before { content: 'V'; position: absolute; right: -10px; top: -20px; font-family: 'Playfair Display', serif; font-size: 180px; color: rgba(255,255,255,0.05); font-weight: 600; line-height: 1; pointer-events: none; }
  .header-eyebrow { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #FFBA85; margin-bottom: 8px; }
  .header-title { font-family: 'Playfair Display', serif; font-size: 38px; font-weight: 500; color: #fff; line-height: 1.1; margin-bottom: 4px; }
  .header-taronja { font-size: 11px; color: #FFBA85; font-style: italic; margin-bottom: 6px; letter-spacing: 0.02em; }
  .header-sub { font-size: 13px; color: rgba(255,255,255,0.55); font-weight: 300; }
  .now-bar { background: #fff; border-bottom: 1px solid var(--border); }
  .now-inner { display: flex; align-items: flex-start; gap: 10px; padding: 11px 20px; }
  .now-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--taronja-mid); flex-shrink: 0; margin-top: 5px; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  .now-label { font-size: 10px; font-weight: 500; color: var(--taronja-mid); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 2px; }
  .now-text { font-size: 12px; color: var(--ink); line-height: 1.5; }
  .now-loading { font-size: 12px; color: var(--muted); font-style: italic; }
  .now-refresh { margin-left: auto; font-size: 11px; color: var(--taronja-mid); cursor: pointer; flex-shrink: 0; padding: 2px 6px; border: 0.5px solid var(--taronja-mid); border-radius: 10px; background: none; font-family: inherit; white-space: nowrap; }
  .nav { display: flex; gap: 6px; overflow-x: auto; padding: 14px 20px; scrollbar-width: none; background: var(--cream); border-bottom: 1px solid var(--border); }
  .nav::-webkit-scrollbar { display: none; }
  .nav-btn { flex-shrink: 0; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-family: inherit; cursor: pointer; border: 1px solid var(--border); background: #fff; color: var(--muted); transition: all 0.15s; white-space: nowrap; }
  .nav-btn.active { background: var(--taronja-dark); color: #fff; border-color: var(--taronja-dark); }
  .content { padding: 0 0 80px; }
  .section-cards { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 10px; padding: 16px 20px; }
  .sec-card { position: relative; border-radius: 14px; overflow: hidden; cursor: pointer; transition: transform 0.15s; height: 140px; border: 3px solid transparent; }
  .sec-card:active { transform: scale(0.97); }
  .sec-card-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  .sec-card-body { position: relative; z-index: 1; padding: 12px; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; background: linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0) 100%); border-radius: 14px; }
  .sec-title { font-size: 14px; font-weight: 800; color: #fff; margin-bottom: 3px; line-height: 1.3; text-shadow: 0 2px 6px rgba(0,0,0,1), 0 0 16px rgba(0,0,0,0.9); letter-spacing: 0.01em; }
  .sec-sub { font-size: 12px; font-weight: 600; color: #fff; line-height: 1.3; text-shadow: 0 2px 6px rgba(0,0,0,1); }
  .sec-badge { display: inline-block; font-size: 10px; padding: 2px 7px; border-radius: 10px; margin-top: 6px; background: rgba(0,0,0,0.25); color: #fff; width: fit-content; }
  .section-view { animation: slideIn 0.2s ease; }
  @keyframes slideIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  .section-header { background: var(--taronja-dark); padding: 16px 20px; display: flex; align-items: center; gap: 12px; }
  .back-btn { width: 32px; height: 32px; border-radius: 9px; background: rgba(255,255,255,0.15); border: none; color: #fff; font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-family: inherit; }
  .section-header-text h2 { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 500; color: #fff; }
  .section-header-text p { font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 1px; }
  .insider-box { margin: 14px 20px 0; background: var(--taronja-light); border-radius: 12px; padding: 12px 14px; display: flex; gap: 10px; }
  .insider-icon { font-size: 15px; flex-shrink: 0; margin-top: 1px; }
  .insider-label { font-size: 10px; font-weight: 500; color: var(--taronja-mid); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 3px; }
  .insider-text { font-size: 12px; color: var(--taronja-text); line-height: 1.6; }
  .items-list { margin-top: 14px; }
  .item-row { display: flex; align-items: flex-start; gap: 12px; padding: 12px 20px; border-bottom: 1px solid var(--border); transition: background 0.1s; }
  .item-row:hover { background: rgba(0,0,0,0.02); }
  .item-row:last-child { border-bottom: none; }
  .item-num { width: 26px; height: 26px; border-radius: 50%; background: var(--taronja-light); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 500; color: var(--taronja-mid); flex-shrink: 0; margin-top: 1px; }
  .item-name { font-size: 13px; font-weight: 500; color: var(--ink); margin-bottom: 3px; }
  .item-desc { font-size: 12px; color: var(--muted); line-height: 1.5; }
  .item-addr { font-size: 11px; color: var(--taronja-mid); margin-top: 4px; display: flex; align-items: center; gap: 3px; text-decoration: none; }
  .item-addr:hover { text-decoration: underline; }
  .loading-spinner { display: inline-block; width: 12px; height: 12px; border: 1.5px solid var(--taronja-light); border-top-color: var(--taronja-mid); border-radius: 50%; animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
`;


function SectionView({ section, onBack }) {
  const data = CONTENT[section.id];

  return (
    <div className="section-view">
      <div className="section-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <div className="section-header-text">
          <h2>{section.label}</h2>
          <p>{section.desc}</p>
        </div>
      </div>
      <MosaicStrip height={18} />
      <div className="insider-box">
        <span className="insider-icon">💬</span>
        <div>
          <div className="insider-label">Insider note</div>
          <div className="insider-text">{data.insiderNote.split('\n\n').map((p, i) => <p key={i} style={{marginBottom: i < data.insiderNote.split('\n\n').length - 1 ? '8px' : 0}}>{p}</p>)}</div>
        </div>
      </div>
      <div className="items-list">
        {data.items.map((item, i) => (
          <div key={i} className="item-row">
            <div className="item-num">{i + 1}</div>
            <div>
              <div className="item-name">{item.name}</div>
              <div className="item-desc">{item.desc}</div>
              {item.address && (
                <a
                  className="item-addr"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address + ", Valencia, Spain")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📍 {item.address}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NowBar() {
  const [text, setText] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetch_now = useCallback(async () => {
    setLoading(true);
    setText(null);
    try {
      const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          system: `You are a Valencia, Spain local insider. Today is ${today}. Search the web and return ONLY a single short plain-text sentence (max 120 chars, no markdown, no quotes) summarising what's happening in Valencia right now — current festivals, major events, seasonal notes, or market/museum highlights. Be specific and current. Never mention Fallas unless it's actually March. Do not include any preamble, labels, or explanation — just the sentence itself.`,
          messages: [{ role: "user", content: "What's happening in Valencia right now?" }],
        }),
      });
      const data = await res.json();
      const textBlocks = (data.content || []).filter(b => b.type === "text").map(b => b.text).join(" ").trim();
      const clean = textBlocks.replace(/^["']|["']$/g, "").trim();
      setText(clean || "Valencia is alive:check local listings for today's events. - COMING SOON");
    } catch {
      setText("Valencia is alive — check local listings for today's events.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch_now(); }, [fetch_now]);

  return (
    <div className="now-bar">
      <div className="now-inner">
        <div className="now-dot" />
        <div style={{ flex: 1 }}>
          <div className="now-label">Happening now</div>
          {loading
            ? <div className="now-loading"><span className="loading-spinner" style={{ marginRight: 6 }} />Checking what's on…</div>
            : <div className="now-text">{text}</div>
          }
        </div>
        <button className="now-refresh" onClick={fetch_now}>↻ refresh</button>
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState(null);

  const activeSection = active ? SECTIONS.find(s => s.id === active) : null;

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="header">
          <div className="header-eyebrow">Your insider guide</div>
          <div className="header-title">Valencia</div>
          <div className="header-taronja">la ciutat de la taronja</div>
          <div className="header-sub">What to eat, see & do while visiting our beatiful city</div>
          <div style={{marginTop:20,marginLeft:-20,marginRight:-20,marginBottom:-28}}>
            <MosaicStrip height={20} />
          </div>
        </div>

        <NowBar />

        <div className="content">
          {!activeSection ? (
            <>
              <div className="nav">
                {SECTIONS.map(s => (
                  <button key={s.id} className="nav-btn" onClick={() => setActive(s.id)}>
                    {s.icon} {s.label.split(" ")[0]}
                  </button>
                ))}
              </div>
              <div className="section-cards">
                {SECTIONS.map(s => (
                  <div key={s.id} className="sec-card" onClick={() => setActive(s.id)}>
  {CARD_SVGS[s.id]}
  <div className="sec-card-body">
    <div className="sec-title">{s.label}</div>
    <div className="sec-sub">{s.desc}</div>
    <div className="sec-badge">{CONTENT[s.id].items.length} picks</div>
  </div>
  <div style={{position:'absolute',bottom:0,left:0,right:0,zIndex:10}}>
    <MosaicStrip height={10} opacity={1}/>
  </div>
</div>
                ))}
              </div>
            </>
          ) : (
            <SectionView section={activeSection} onBack={() => setActive(null)} />
          )}
        </div>
      </div>
    </>
  );
}