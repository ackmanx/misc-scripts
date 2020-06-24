# How to add a subdomain to my Heroku app

1. Add the domain to Heroku via the CLI or web UI
    * https://dashboard.heroku.com/apps/ganjing/settings
    * For _Domain Name_ put in the domain you want to use
        * `vocab.ganjing-hoho.com`
    * Heroku will auto-generate a _DNS Target_ and it looks like a random string

2. Add DNS records to my domain registrar, _Namecheap_
    * https://ap.www.namecheap.com/Domains/DomainControlPanel/ganjing-hoho.com/advancedns
    * Click on `Add new record` or something
    * Type: `CNAME`
    * Host: this is the subdomain part
        * Ex: `vocab` (if I wanted `vocab.ganjing-hoho.com`)
    * Value: this is the _DNS Target_ that Heroku auto-generated earlier
    * TTL: `Automatic`

You should now see that if you go to `vocab.ganjing-hoho.com` you are sent to the same application at `ganjing-hoho.com`
