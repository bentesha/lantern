
module.exports = {
    main(){
        let options = [
            'Kanda ya Pwani',
            'Kanda ya Kaskazini',
            'Kanda ya Ziwa',
            'Kanda ya Kati',
            'Kanda ya Juu Kusini',
            'Kanda ya Kusini'
        ];

        if(this.input == null){
            this.sendMenu(options);
        } else {
            let option = parseInt(this.input);
            if(typeof option == 'number' && options[option - 1] !== undefined){
                this.data.zone = options[option - 1];
                this.forward('distributors/zones/index');
            } else {
                this.sendMenu(options, 'You have entered an invalid option!');
            }
        }
    }
}