#mini-Neptun:
##1. Követelményanalízis
###1.1 Funkcionális követelmények:
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
 
###1.2 Szakterületi fogalomjegyzék

###1.3 Használatieset-modell
* **Vendég:** a bejelentkezési oldalon kívül más nem érhető el számára.
* **Hallgató:** kereshet a kiírt tárgyak között, és megtekintheti azokat. Egy Oktató által kiírt tárgy egyik kurzusára jelentkezhet, illetve egy már felvett kurzusról jelentkezhet le. Megtekintheti a más hallgatók által cserélni kívánt kurzusokat, ha fel van jelentkezve cserére alkalmas kurzusra, akkor cseréleht is, illetve saját maga is jelölhet meg kurzust cserére.
* **Oktató:** Kereshet a kiírt tárgyak között, és megtekintheti azokat. Új tárgyak felvételére, saját tárgyai szerkesztésre, tárgyaihoz kurzusok létrehozásra, szerkesztésére képes.
* **Admin:** kereshet a kiírt tárgyak között, és megtekintheti azokat. Új felhasználókat vehet fel az alkalmazásba.

![alt text](https://github.com/Bicz4477/mini-neptun/docs/usecase.png "Használati eset diagram")

###1.4 Folyamatok
* **Vendég:** 
  * bejelentkezés
![alt text](https://github.com/Bicz4477/mini-neptun/docs/login_folyamat.png "bejelentkezés folymat diagram")

* Miden **bejelentkezett felhasználó** számára elérhető folyamatok:
  * Tárgy megtekint
![alt text](https://github.com/Bicz4477/mini-neptun/docs/targy_megtekint.png "tárgy megtekint folyamat")

* **Admin:** 
  * új felhasználó felvétele
![alt text](https://github.com/Bicz4477/mini-neptun/docs/uj_felhasznalo.png "felhasználó rögzítés folyamat")

* **Oktató:** 
  * új tárgy felvétele
![alt text](https://github.com/Bicz4477/mini-neptun/docs/uj_targy.png "új tárgy rögzítés folyamat")

  * tárgy szerkesztése
  ![alt text](https://github.com/Bicz4477/mini-neptun/docs/targy_szerkeszt.png "tárgy szerkesztése folyamat")
  
  * új kurzus
  ![alt text](https://github.com/Bicz4477/mini-neptun/docs/uj_kurzus.png "új kurzus folyamat")
  
  * kurzus szerkesztése
  ![alt text](https://github.com/Bicz4477/mini-neptun/docs/kurzus_szerkeszt.png "kurzus szerkesztése folyamat")
  
* **Hallgató**
  * Kurzus felvétele
  ![alt text](https://github.com/Bicz4477/mini-neptun/docs/kurzus_felvetel.png "kurzus felvesz folyamat")
  
  * Kurzus lead
  ![alt text](https://github.com/Bicz4477/mini-neptun/docs/kurzus_lead.png "kurzus felvesz folyamat")
  
  * Cserére jelöl
  ![alt text](https://github.com/Bicz4477/mini-neptun/docs/kurzus_csere_jel.png "kurzus cserére jelöl folyamat")
  
  * Csere elfogad:
  ![alt text](https://github.com/Bicz4477/mini-neptun/docs/csere_elfogad.png "csere elfogad")
