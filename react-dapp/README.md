
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
