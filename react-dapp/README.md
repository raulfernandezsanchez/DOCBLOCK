## <u>**Terminal 1:**</u>

1. Instal·lar truffle

###   `npm install -g truffle`

Per utilitzar blockchain seguir els següents passos:

2. Al directori arrel del projecte:

Instal·lar dependencies de truffle: `npm install @truffle/hdwallet-provider`


Inicialitzar truffle:
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

## <u>**Terminal 2:**</u>

1. Intal·lar extensió del chrome `Metamask`

  Afegir una nova xarxa:

  1.1. Nom de la xarxa: *LocalHost 9545*

  1.2. Nova direcció URL de RPC

  Al fer `truffle develop` apareix la URL que s'utilitza (De l'estil: http://127.0.0.1:9545/)

  Configurar en el fitxer src/getWeb3.js el port utilitzat.

  1.3. Identificador de cadena: *1337*

  1.4 Símbol de la moneda: *ETH*

  Un cop afegida la xarxa, s'ha d'afegir la account generada pel truffle develop.

  (El primer cop que ens connectem a la blockchain després d'arrencar el servidor metamask ens demanarà la contrasenya que hem configurat durant la instal·lació)



2. Al directori arrel:

  Instal·lar diverses dependencies:

  ### `npm i react-app-rewired`
  ### `npm install react-s3`
  ### `npm i ethereumjs-tx`
  ### `npm install`

3. Al directori /client:

  Per obrir la web:

  ### `npm run start`
