(function () {
    Vue.component("first_comp", {
        template: "#template",
        props: ["title", "idf", "f"],
        data: function () {
            return {
                name: "peter",
                count: 0,
                coment: null,
            };
        },
        mounted: function () {
            console.log("comp monted ", this.title);
            console.log("comp monted id ", this.idf);

            var thisAxios = this;
            axios
                .post("/onerd", { myid: thisAxios.idf })
                .then(function (resp) {
                    console.log("resp from post", resp.data);
                    thisAxios.coment = resp.data;
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        methods: {
            closemodo: function () {
                console.log("close modod");
                location.hash = "";
                this.$emit("close", this.count);
            },
            handleClickc: function (e) {
                console.log("click submit the button !!");
                e.preventDefault();

                console.log("this (:", this);
                // var formData = new FormData();
                // formData.append("title", this.title);
                // formData.append("dis", this.dis);
                // formData.append("username", this.username);
                // formData.append("file", this.file);
                // can not log the formdata and it will be empty
                var thisAxioss = this;
                axios
                    .post("/cupload", {
                        username: thisAxioss.username,
                        comments: thisAxioss.com,
                        id: thisAxioss.idf,
                    })
                    .then(function (resp) {
                        console.log("resp from post", resp.data);
                        thisAxioss.coment.push(resp.data[0]);
                        thisAxioss.username = thisAxioss.com = "";
                        // console.log("this in post return ", thisAxios.imgs);

                        // thisAxios.title = thisAxios.dis = thisAxios.username =
                        //     "";
                        // thisAxios.file = null;
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
        },
    });
    new Vue({
        el: "#main",
        data: {
            name: "vannila",
            seen: false,
            cities: [],
            imgs: [],
            title: "",
            dis: "",
            username: "",
            imageId: location.hash.slice(1),
            file: null,
            selectedFruit: null,
            fruit: null,
            fruits: [
                {
                    title: "🥝",
                    id: 1,
                },
                {
                    title: "🍓",
                    id: 2,
                },
                {
                    title: "🍋",
                    id: 3,
                },
            ],
        },
        mounted: function () {
            console.log("my vue is mounted");
            var self = this;
            axios
                .get("/cities")
                .then(function (res) {
                    //console.log("response : ", res.data);
                    self.imgs = res.data.reverse();
                })
                .catch((err) => {
                    console.log(err);
                });

            window.addEventListener("hashchange", function () {
                console.log("hashh change ", location.hash);
                self.imageId = location.hash.slice(1);
            });
            console.log("my city is ", this.cities);
        },
        watch: {
            imageId: function () {
                console.log("whatcher reporting ");
                window.addEventListener("hashchange", function () {
                    console.log("hashh change ", location.hash);
                    self.imageId = location.hash.slice(1);
                });
            },
        },
        methods: {
            closemodo: function (count) {
                console.log("i am the parents i jst hert the event close ");
                console.log("count", count);
                this.imageId = false;
                this.selectedFruit = false;
            },
            handleClick: function (e) {
                console.log("click submit the button !!");
                e.preventDefault();

                console.log("this (:", this);
                var formData = new FormData();
                formData.append("title", this.title);
                formData.append("dis", this.dis);
                formData.append("username", this.username);
                formData.append("file", this.file);
                // can not log the formdata and it will be empty
                var thisAxios = this;
                axios
                    .post("/upload", formData)
                    .then(function (resp) {
                        console.log("resp from post", resp.data[0]);
                        thisAxios.imgs.unshift(resp.data[0]);
                        console.log("this in post return ", thisAxios.imgs);

                        thisAxios.title = thisAxios.dis = thisAxios.username =
                            "";
                        thisAxios.file = null;
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            handlechange: function (e) {
                console.log("hndle change run  !!");
                //  e.preventDefault();
                console.log("this (:", e.target.files[0]);
                this.file = e.target.files[0];
            },
        },
    });
})();
