# Zaledne Storitve Računalniških Iger

Ta projekt predstavlja krajši prototip zalednih storitev računalniških iger.

Repozitorij se uporablja za izdelavo zaključnega dela na Fakulteti za elektrotehniko, računalništvo in informatiko. 

## Tehnologije

- Node.js
- Express
- MongoDB
- React

## Postopek testiranja


### 1. Potrebne datoteke

V direktoriju postman/ se nahajata 2 datoteki:
- ZSRI.postman_collection.json
- ZSRI.postman_environment.json

Obe datoteki sta izvoženi iz programske opreme Postman, prva vsebuje podatke o celotni ZSRI kolekciji, druga pa okolje, kar vključuje tudi spremenljivke okolja kot so uporabnikov ID in podobno.

### 2. Uvoz datotek v programsko opremo Postman

V programski opremi Postman kliknemo na gumb "import", in nato izberemo ti dve datoteki. Na koncu tega koraka imamo za nas pripravljeno okolje za testiranje.

### 3. Postman runner

Postman vsebuje ogromno različnih orodij, ki nam olajšajo delo. Eno izmed najbolj uporabnih je Collection Runner. S pomočjo tega lahko orodje samo požene naše skripte za nas in to več hkrati, tako da ne rabimo testirati ročno. To je seveda pratkično, da ne ponavljamo istih akcij znova in znova.

V orodju Collection Runner si izberemo mapo s skriptami, ki jo želimo testirati. Ponudi se nam nekaj različnih možnosti kot so:

- okolje, ki ga želimo med testiranjem uporabljati
- število iteracij
- logiranje rezultatov po vsaki zahtevi
- shranjevanje spremenljivk
- zamik ob vsakem klicu skripte
- podatki iz zunanjih virov

Ko smo s vsemi parametri zadovljni lahko poženemo teste. Na koncu se nam izpiše celoten čas trajanja in statusna koda, ki jo prejmemo (200 - OK, 404 - Not found, itd.)

Za več informacij se lahko obrnete na uradno [Postman dokumentacijo](https://learning.postman.com/docs/running-collections/intro-to-collection-runs/).
