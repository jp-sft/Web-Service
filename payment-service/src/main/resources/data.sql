insert into categories(name) values ('Ordinateur Portable');
insert into categories(name) values ('Ordinateur de bureau');
insert into categories(name) values ('Tablettes Tactiles');
insert into categories(name) values ('Stockage');
insert into categories(name) values ('Serveurs');
insert into categories(name) values ('Sacs Scolaires & Trousses');
insert into categories(name) values ('Composants Serveur');
insert into categories(name) values ('Périphérique et Accessoires');
insert into categories(name) values ('Composants Informatique');
insert into categories(name) values ('Destockage Informatique');

INSERT INTO CATEGORIES(name, parent_id) values ( 'Pc Portable', 1);
INSERT INTO CATEGORIES(name, parent_id) values ( 'UltraBook', 1);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Netbook', 1);
INSERT INTO CATEGORIES(name, parent_id) values ( 'PC Gamer', 1);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Mac', 1);

INSERT INTO CATEGORIES(name, parent_id) values ( 'PC de Bureau', 2);
INSERT INTO CATEGORIES(name, parent_id) values ( 'PC Tout en un', 2);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Ordinateur Gamer', 2);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Ecran', 2);
INSERT INTO CATEGORIES(name, parent_id) values ( 'iMac', 2);

INSERT INTO CATEGORIES(name, parent_id) values ( 'Tablettes Android', 3);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Tablettes Graphique', 3);
INSERT INTO CATEGORIES(name, parent_id) values ( 'iPad', 3);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Accessoires Tablette', 3);

INSERT INTO CATEGORIES(name, parent_id) values ( 'Disque Dur', 4);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Disque Dur Interne', 4);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Disque Dur Externe', 4);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Disque Dur SSD', 4);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Clé USB', 4);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Carte Mémoire', 4);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Lecteur de cartes', 4);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Accessoires de Stockage', 4);
INSERT INTO CATEGORIES(name, parent_id) values ( 'CD & DVD', 4);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Disque Dur Interne Vidéosurveillance', 4);

INSERT INTO CATEGORIES(name, parent_id) values ( 'Serveur Tour', 5);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Serveur Rack', 5);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Station de Travail', 5);

INSERT INTO CATEGORIES(name, parent_id) values ( 'Sac à Dos & Sacoche Scolaire', 6);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Sac à Goûter', 6);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Trousse', 6);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Accessoires sac à dos', 6);

INSERT INTO CATEGORIES(name, parent_id) values ( 'Barrette Mémoire', 7);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Boîte d''alimentation', 7);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Contrôleur', 7);



INSERT INTO CATEGORIES(name, parent_id) values ( 'Cable Antivol PC', 8);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Sacs & Sacoches', 8);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Clavier & Souris', 8);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Tapis de Souris', 8);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Webcam', 8);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Refroidisseurs', 8);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Hub USB', 8);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Lampe de Bureau', 8);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Support Ecran', 8);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Accessoires Divers', 8);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Station d''accueil', 8);

INSERT INTO CATEGORIES(name, parent_id) values ( 'Processeur', 9);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Carte Graphique', 9);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Ventilateur', 9);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Barrettes Mémoire', 9);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Carte Mère', 9);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Boîtier', 9);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Bloc d''alimentation', 9);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Chargeur PC Portable', 9);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Batterie PC Portable', 9);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Afficheur Ecran', 9);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Graveurs et Lecteurs', 9);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Clavier PC Portable', 9);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Carte Son', 9);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Pâte thermique', 9);

INSERT INTO CATEGORIES(name, parent_id) values ( 'Pc Portable', 10);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Pc de Bureau', 10);
INSERT INTO CATEGORIES(name, parent_id) values ( 'Barrettes Memoire', 10);

-- PC Bureau
INSERT INTO PRODUCTS( unit_price, category_id, weight, name, description) VALUES ( 545, 11, 5, 'PC Portable ASUS Chromebook C204 N4020 4Go 32 Go eMMC - Gris Foncé', 'Écran 11.6" HD - Processeur: Intel Celeron N4020 (1,10 GHz up to 2.80 GHz, 4 Mo de mémoire cache, Dual-Core) - Système d''exploitation: Chrome OS - Mémoire RAM: 4 Go LPDDR4 - Disque Dur: 32 Go eMMC - Carte Graphique: Intel UHD 600 Graphics avec Wi-Fi, Bluetooth, 3x USB 3.2 Gen 1 Type-A, 3x USB 3.2 Gen 1 Type-C, 1 x combo audio jack de 3,5 mm et lecteur de cartes Micro SD - Clavier Chiclet - Couleur: Gris foncé - Garantie: 1 an');
INSERT INTO PRODUCTS( unit_price, category_id, weight, name, description) VALUES ( 835, 11, 4.2, 'PC PORTABLE LENOVO V14 IGL N4020 4GO 1TO - GRIS', 'Écran 14" HD - Processeur: Intel Celeron N4020 (1,10 GHz up to 2.80 GHz , 4Mo de mémoire cache, Dual-Core) - Système d''exploitation: FreeDos - Mémoire RAM: 4 Go DDR4-2400 - Disque Dur: 1To HDD - Carte Graphique: Intel UHD Graphics 600 avec Wi-Fi, Bluetooth,1x USB 2.0, 2x USB 3.1 Gen 1, 1x HDMI 1.4b, 1x prise combo casque/micro (3,5 mm) et lecteur de carte - Couleur: Gris - Garantie: 1 an');
INSERT INTO PRODUCTS( unit_price, category_id, weight, name, description) VALUES ( 580, 11, 4.2, 'PC PORTABLE LENOVO IDEAPAD 3 14IGL05 N4020 4GO 1TO - GRIS', 'Écran 14" HD - Processeur: Intel Celeron N4020 (1,10 GHz up to 2.80 GHz , 4Mo de mémoire cache, Dual-Core) - Système d''exploitation: FreeDos - Mémoire RAM: 4 Go DDR4-2400 - Disque Dur: 1 To HDD - Carte Graphique: Intel UHD Graphics 600 avec Wi-Fi, Bluetooth, 1x USB 2.0, 2x USB 3.2 Gen 1, 1x HDMI 1.4b, 1x prise combinée casque/microphone (3,5 mm) et lecteur de carte - Couleur: Gris - Garantie: 1 an');
--Sac et sacoches
INSERT INTO PRODUCTS( unit_price, category_id, weight, name, description) VALUES ( 75, 38 , 0.2, 'SAC À DOS LENOVO B510 15.6" - NOIR (GX40Q75214)', 'Sac à dos LENOVO B510 Pour Pc Portables 15.6" - Compartiment rembourré pour ordinateur portable séparé, compartiment d''accès rapide, poche antivol - Tissu résistant à l''eau en polyester - Bandoulière réglable - Couleur: Noir');

INSERT INTO ORDERS(status) VALUES ( 'CREATED' );
INSERT INTO ORDERS(status) VALUES ( 'DELIVERED' );
INSERT INTO ORDERS(status) VALUES ( 'PAID' );
INSERT INTO ORDERS(status) VALUES ( 'SHIPPING' );

INSERT INTO ORDER_LINES(order_id, product_id, quantity, sub_total) VALUES ( 1, 1, 1 ,545 );
INSERT INTO ORDER_LINES(order_id, product_id, quantity, sub_total) VALUES ( 1, 4, 1 , 75);
INSERT INTO ORDER_LINES(order_id, product_id, quantity, sub_total) VALUES ( 2, 2, 4 , 835*4);
INSERT INTO ORDER_LINES(order_id, product_id, quantity, sub_total) VALUES ( 2, 1, 3, 545*3 );
INSERT INTO ORDER_LINES(order_id, product_id, quantity, sub_total) VALUES ( 3, 2, 1, 835  );


INSERT INTO CURRENCIES(code, name) VALUES ( 'TND', 'Dinard Tunisien' );
INSERT INTO CURRENCIES(code, name) VALUES ( 'EUR', 'EURO' );
INSERT INTO CURRENCIES(code, name) VALUES ( 'USD', 'Dollar américain' );

INSERT INTO PAYMENTS(order_id, amount, currency_id, payment_type, bank, name) VALUES ( 3, 835, 1, 'CASH', 'Attijari', 'CASH1' )