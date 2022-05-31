
1. Instal·lar truffle

###   `npm install -g truffle`

Per utilitzar blockchain seguir els següents passos:

2. Al directori arrel del projecte:

###   `truffle develop`

   Hem de veure que estem a truffle(develop) i han d'aparèixer les adreçes, si apareix el següent error:

       Error: error:0308010C:digital envelope routines::unsupported

       Fer a la carpeta arrel:

       ###   `export NODE_OPTIONS=--openssl-legacy-provider`

4. Compilar el contracte:

###   `compile`

5. Fer el deploy en local:

###   `migrate`

  Si volem fer un redeploy:

###   `migrate --reset`

6. Al fitxer src/deploy.json

  (omplir el fitxer amb les dades que apareixen al terminal)

   6.1. Enganxar address, private key de la compte que volguem utilitzar.

   6.2. Enganxar contract address.

7. Intal·lar extensió del chrome `Metamask`

  Configurar a metamask el mateix port en local que en el fitxer src/getWeb3.js

  (El primer cop que ens connectem a la blockchain després d'arrencar el servidor
  metamask ens demanarà la contrasenya que hem configurat durant la instal·lació)
