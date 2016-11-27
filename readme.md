#mini-Neptun:
##1. Célkitűzés
Az alkalmazás célja, hogy a diákok interneten keresztül intézhessék a tárgyfelvételeiket.
##2. Követelményanalízis
###2.1. Funkcionális követelmények:
####Vendégek számára elérhető funkciók:
 * Vendégként csak a login oldal tekinthető meg.

####Hallgatók számára elérhető funkciók:
 * Hallgatóknak lehetőségük van a login oldalon bejelentkezni.
 * Hallgatóknak lehetőségük van szerkeszteni a profiljukat.
 * Hallgatók jelentkezhetnek az oktatók által kiírt tárgyak valamely kurzusára.
 * Hallgatók leadhatnak egy már felvett tárgyat.
 * Két hallgató cserélhet egymással azonos tárgyhoz tartozó kurzust.

####Oktatók számára elérhető funkciók:
 * Oktatóknak lehetőségük van a login oldalon bejelentkezni.
 * Oktatóknak lehetőségük van szerkeszteni a profiljukat.
 * Oktatóknak lehetőségük van új tárgyak kiírására.
 * Oktatóknak lehetőségük van már létező, általuk létrehozott tárgyak adatainak szerkesztésére (kredit, leírás, webcím, stb.).
 * Oktatóknak lehetőségük van egy tárgyhoz kurzusok felvételére.
 * Oktatóknak lehetőségük van kurzusok adatainak szerkesztésére (férőhely, helyszín, időpont, megjegyzés, leírás, stb.).
 * Oktatóknak lehetőségük van egy tárgy kurzusaira való jelentkezés lezárására.		

####Adminok számára elérhető funkciók:
 * Adminak lehetősége van a login oldalon bejelentkezni.
 * Admin szerkesztheti a profilját.
 * Admin rögzíthet az alkalmazásba új felhasználókat

###Nem funkcionális követelmények:
 * Felhasználóbarát, ergonomikus elrendezés és kinézet.
 * Gyors működés.
 * Jelszavak biztonságos tárolása.
 * Funkciókhoz való hozzáférés elött jogosultság vizsgálat.
 
###2.2. Szakterületi fogalomjegyzék

###2.3. Használatieset-modell
* **Vendég:** a bejelentkezési oldalon kívül más nem érhető el számára.
* **Hallgató:** kereshet a kiírt tárgyak között, és megtekintheti azokat. Egy Oktató által kiírt tárgy egyik kurzusára jelentkezhet, illetve egy már felvett kurzusról jelentkezhet le. Megtekintheti a más hallgatók által cserélni kívánt kurzusokat, ha fel van jelentkezve cserére alkalmas kurzusra, akkor cseréleht is, illetve saját maga is jelölhet meg kurzust cserére.
* **Oktató:** Kereshet a kiírt tárgyak között, és megtekintheti azokat. Új tárgyak felvételére, saját tárgyai szerkesztésre, tárgyaihoz kurzusok létrehozásra, szerkesztésére képes.
* **Admin:** kereshet a kiírt tárgyak között, és megtekintheti azokat. Új felhasználókat vehet fel az alkalmazásba.

![alt text](docs/usecase.png "Használati eset diagram")

###2.4. Folyamatok
* **Vendég:** 
  * bejelentkezés
![alt text](docs/login_folyamat.png "bejelentkezés folymat diagram")

* Miden **bejelentkezett felhasználó** számára elérhető folyamatok:
  * Tárgy megtekint
![alt text](docs/targy_megtekint.png "tárgy megtekint folyamat")

* **Admin:** 
  * új felhasználó felvétele
![alt text](docs/uj_felhasznalo.png "felhasználó rögzítés folyamat")

* **Oktató:** 
  * új tárgy felvétele
![alt text](docs/uj_targy.png "új tárgy rögzítés folyamat")

  * tárgy szerkesztése
  ![alt text](docs/targy_szerkeszt.png "tárgy szerkesztése folyamat")
  
  * új kurzus
  ![alt text](docs/uj_kurzus.png "új kurzus folyamat")
  
  * kurzus szerkesztése
  ![alt text](docs/kurzus_szerkeszt.png "kurzus szerkesztése folyamat")
  
* **Hallgató**
  * Kurzus felvétele
  ![alt text](docs/kurzus_felvetel.png "kurzus felvesz folyamat")
  
  * Kurzus lead
  ![alt text](docs/kurzus_lead.png "kurzus felvesz folyamat")
  
  * Cserére jelöl
  ![alt text](docs/kurzus_csere_jel.png "kurzus cserére jelöl folyamat")
  
  * Csere elfogad:
  ![alt text](docs/csere_elfogad.png "csere elfogad")

##3. Tervezés
###3.1. Oldaltérkép
**Publikus**
- Bejelentkezés

**Bejelentkezett felhasználó:**
- Kilépés
- Profil
  + Profil szerkesztése
- Tárgyak listázása
  + Tárgy megtekintése
  
**Admin jogosultásggal elérhető még:**
- Új felhasználó felvétele

**Oktató jogosultásggal elérhető még:**
- Új tárgy felvétele
- Tárgyak listázása
  + Tárgy megtekintése
    * Új Kurzus
    * Kurzus szerkesztése
  + Tárgy szerkesztése
  
**Hallgató jogosultásggal elérhető még:**
- Tárgyak listázása
  + Tárgy megtekintése
    * Kurzus cserére jelöl
- Kurzus csere lehetőségek
      
###3.2. Végpontok

* `GET '/'`: főoldal
* `GET '/subjects'`: tárgylista
* `POST '/subjects'`: tárgylista, filter adatok küldése
* `GET '/subject/:id'`: tárgy megtekintése
* `GET '/addsubject'`: új tárgy felvitele, űrlap megjelenítés
* `POST '/addsubject'`: új tárgy felvitele, adatok küldése
* `GET '/subject/:id/editsubject'`: tárgy szerkesztése, űrlap megjelenítés
* `POST '/subject/:id/editsubject'`: tárgy szerkesztése, adatok küldése
* `GET '/subject/:id/addcourse'`: új kurzus felvitele, űrlap megjelenítés
* `POST '/subject/:id/addcourse'`: új kurzus felvitele, adatok küldése
* `GET '/subject/:id/editcourse/:cid'`: kurzus szerkesztése, űrlap megjelenítés
* `POST '/subject/:id/editcourse/:cid'`: kurzus szerkesztése, adatok küldése
* `GET '/signup/:cid'`: kurzusra jelentkezés parancs
* `GET '/signdown/:cid'`: kurzusról lejelentkezés parancs
* `GET '/trade'`: kurzus cserére jelölése, űrlap megjelenítés
* `POST '/trade'`: kurzus cserére jelölése, adatok küldése
* `GET '/trades'`: csere ajánlatok listázása
* `GET '/deal'`: csere elfogadás parancs


* `GET '/registration'`: új felhasználó felvitele, űrlap megjelenítés
* `GET '/profile/edit'`: saját profil szerkesztése, űrlap megjelenítés
* `GET '/profile/show'`: profil megtekintése
* `POST '/profile/edit'`: saját profil szerkesztése, adatok küldése
* `POST '/registration'`: új felhasználó felvitele, adatok küldése
* `GET '/login'`: bejelentkező oldal
* `POST '/login'`: bejelentkezési adatok küldése
* `GET '/logout'`: kijelentkezés

###3.3. Osztálydiagram
![alt text](https://github.com/Bicz4477/mini-neptun/blob/master/docs/osztalydiagram.png "osztalydiagram")

###3.4. Adatbázisterv
![alt text](docs/adatbazisterv.png "Adatbázisterv")

###3.5. Oldalvázlatok

##Bejelentekés
![alt text](docs/img/login.jpg "Bejelentekés")

##Felhasználó rögzítése
![alt text](docs/img/regiszt.jpg "Felhasználó rögzítése")

##Profil szerkesztése/megtekintése
![alt text](docs/img/profil_szerkeszt.jpg "Profil szerkesztése")

##Főoldal
![alt text](docs/img/fooldal.jpg "Főoldal")

##Új tárgy rögzítése
![alt text](docs/img/Új_tárgy.jpg "Új Tárgy")

##Tárgyak listázása
![alt text](docs/img/targyak.jpg "Tárgyak")

##Tárgy megtekintése
![alt text](docs/img/targy.jpg "Tárgy")

##Tárgy szerkesztése
![alt text](docs/img/targy_szerkeszt.jpg "Tárgy szerkesztése")

##Kurzus rögzítése
![alt text](docs/img/uj_kurzus.jpg "Kurzus rögzítése")

##Kurzus szerkeszt
![alt text](docs/img/kurzus_szerkeszt.jpg "Kurzus szerkeszt")

##Cserére jelöl
![alt text](docs/img/cserere_jelol.jpg "Cserére jelöl")

##Csere
![alt text](docs/img/csere.jpg "Csere")


##4. Telepítés
`git clone https://github.com/Bicz4477/mini-neptun.git`

`cd mini-neptun`

`npm install`

`mv .env.example .env`

`node --harmony_proxies ace migration:run`

`node --harmony_proxies ace db:seed`

alkalmazás indítása: `node --harmony_proxies server`

Alapértelmezett Admin felhasználó: felhasználónév: admin jelszó: alma
