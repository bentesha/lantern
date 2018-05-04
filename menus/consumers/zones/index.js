
module.exports = {
    main(){
        let options = [
            'Tafuta Muuzaji',
            'Tambua bidhaa bandia',
            'Thibitisha bei halali ya PICS'
        ];

        if(this.input === null){
            this.sendMenu(options, 'Karibu PICS - ' + this.data.zone);
            return;
        }

        switch(this.input){
            case '1':
            let msg = 'Samahani! Hakuna wauzaji walio sajliwa katika ukanda huu!';
            if(this.data.zone === 0) {
                msg = 'Asante kwa kutumia PICS.\nWasiliana na Seperatus Kamuntu 0787416437 au 07847406050 ili kuthibitisha au kuweka oda';
            }
            this.send(msg, true);
            break;

            case '2':
            this.send('Mfuko wa PICS una mistari miwili minene (iliyobanwa kwa chini mara mbili) iliyochapishwa neno PICS na KINGA NJAA kwa nje. Ahsante kwa kutumia PICS', true);
            break;

            case '3':
            this.send('Asante kwa kutumia PICS.\nBei halali ni Sh.5000 kwa uuzaji wa rejareja.', true);
            break;

            default:
            this.sendMenu(options, 'Chaguo lako sio sahihi!', options);
            break;
        }
    }
}