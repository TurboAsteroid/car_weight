module.exports = {
    db:{
        mariadb: {
            connectionLimit: 10000,
            waitForConnections: true,
            host: '10.1.255.208',
            port: '3340',
            database: 'mass_transport',
            user: 'root',
            password: 'maSHasUraLmaSha',
            namedPlaceholders: true
        },
  },
    keys: {
        privkey: '/etc/letsencrypt/live/apps.elem.ru/privkey.pem',
        cert: '/etc/letsencrypt/live/apps.elem.ru/cert.pem',
        chain: '/etc/letsencrypt/live/apps.elem.ru/chain.pem'
    }
};
