
module.exports = {
    main(){
        let options = [
            'Tafuta Mawasiliano ya Wasambazaji',
            'Taarifa Kuhusu Bidhaa Bandia',
            'Thibitisha Bei Halali ya PICS'
        ];

        if(this.input === null){
            this.sendMenu(options, 'Karibu PICS - ' + this.data.zone);
            return;
        }

        switch(this.input){
            case '1':
            let msg = 'Samahani! Hakuna wakala aliyesajiliwa kwa ukanda huu.';
            if(this.data.zone === 0) {
                msg = 'Asante kwa kutumia PICS. Wasiliana na Seperatus Kamuntu 0787416437 &amp; 07847406050 ili kuthibitisha au kuweka oda.';
            }
            this.send(msg, true);
            break;

            case '2':
            this.send('Asante kwa kutumia PICS. Tutakupigia ili kupokea maelezo.', true);
            break;

            case '3':
            this.send('Ujumbe: Asante kwa kutumia PICS.\nBei halali Sh 5,000 kwa wauzaji wa reja reja', true);
            break;

            default:
            this.sendMenu(options, 'Chaguo lako sio sahihi!', options);
            break;
        }
    }
}