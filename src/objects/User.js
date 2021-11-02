class User {

    constructor(id, username, avatar, pokemon) {
        this.id = id;
        this.username = username;
        this.avatar = avatar;
        this.party = [pokemon];
        this.money = 5000;
        this.pokedex = {
            caught: 1,
            seen: 1
        };
        this.badges = 0;
        this.isInBattle = false;
        this.battling = {};
    }
}

module.exports = User;