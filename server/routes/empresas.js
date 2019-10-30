const express = require('express')
const router = express.Router()
const Empresa = require('../models/Empresa')


//Create empresa
router.post('/', async (req, res) => {
    //Check if body is empty
    if (Object.keys(req.body).length === 0) {
        return res.json(
            { "code": "500", "msg": "Failed to create" }
        )
    }
    const empresa = new Empresa(req.body)
    try {
        const saved = await empresa.save()
        return res.json(saved)
    } catch (err) {
        console.log(err)
        return res.json(
            { "code": "500", "msg": "Failed to create" }
        )
    }
})

//Search empresa (nome , freg)
router.post('/search', async (req, res) => {
    //Check if body is empty
    if (Object.keys(req.body).length === 0) {
        return res.json(
            { "code": "500", "msg": "Failed to find" }
        )
    }
    try {
        //If req.body.nome has no value, return all the companies from req.body.freg
        if (req.body.nome === null && req.body.freg != null) {
            const empresa = await Empresa.find({
                freguesia: req.body.freg
            })
            const update = await Empresa.updateMany(
                { "freguesia": req.body.freg },
                { $inc: { searched: 1 } }
            )
            return res.json(empresa)
            //If req.body.freg has no value, return all the companies from req.body.nome
        } else if (req.body.freg === null && req.body.nome != null) {
            const empresa = await Empresa.find({
                nome: { $regex: new RegExp(req.body.nome, "i") } //regular expr case-insensitive
            })
            const update = await Empresa.updateMany(
                { "nome": { $regex: new RegExp(req.body.nome, "i") } },
                { $inc: { searched: 1 } }
            )
            return res.json(empresa)
            //nome and freg have values
        } else if (req.body.nome != null && req.body.freg != null) {
            const empresa = await Empresa.find({
                nome: { $regex: new RegExp(req.body.nome, "i") },
                freguesia: req.body.freg
            })
            const update = await Empresa.updateMany(
                { "nome": { $regex: new RegExp(req.body.nome, "i") }, "freguesia": req.body.freg },
                { $inc: { searched: 1 } })

            return res.json(empresa)
        } else if (req.body.nome === null && req.body.freg === null) {
            return res.json(
                { "code": "500", "msg": "Failed to find" }
            )
        }
    } catch (err) {
        console.log(err)
    }
})

//Get top searched
router.post('/get/top/:num', async (req, res) => {
    try {
        const emp = await Empresa.find().sort({ searched: -1 }).limit(parseInt(req.params.num, 10))
        res.json(emp)
    } catch (err) {
        console.log(err)
    }
})

//Get empresas
router.get('/', async (req, res) => {
    try {
        const empresas = await Empresa.find()
        res.json(empresas)
    } catch (err) {
        console.log(err)
    }
})

//Delete empresa
router.delete('/:empresaId', async (req, res) => {
    //Check if body is empty
    if (Object.keys(req.body).length === 0) {
        return res.json(
            { "code": "500", "msg": "Failed to find" }
        )
    }
    try {
        const empresa = await Empresa.remove({
            _id: req.params.empresaId
        })
        res.json(empresa)
    } catch (err) {
        res.json({
            msg: err
        })
    }
})

//Update empresa
router.post('/:empresaId', async (req, res) => {
    //Check if body is empty
    if (Object.keys(req.body).length === 0) {
        return res.json(
            { "code": "500", "msg": "Failed to find" }
        )
    }
    try {
        const updatedEmpresa = await Empresa.updateOne(
            { _id: req.params.empresaId },
            { $set: req.body }   //will only update fields that req has
        )
        res.json(updatedEmpresa)
    } catch (err) {
        console.log(err)
    }
})

//Get names of companies
router.get('/name', async (req, res) => {
    try {
        const names = await Empresa.distinct('nome')
        res.json(names)
    } catch (err) {
        console.log(err)
    }
})

//Get freg (helper for autocomplete)
router.get('/freg', async (req, res) => {
    try {
        const freg = await Empresa.distinct('freguesia')
        res.json(freg)
    } catch (err) {
        console.log(err)
    }
})





//Random data populating db
router.get('/data', (req, res) => {

    //200 Random generated companies
    var myData = {
        "cols": [
            "nome",
            "morada",
            "codigo_postal",
            "freguesia",
            "telefone"
        ],
        "data": [
            [
                "Odio Nam Limited",
                "Ap #476-5006 Luctus Road",
                "09983",
                "Wie",
                "(419) 552-0271"
            ],
            [
                "Tincidunt Nunc PC",
                "6010 Dui Avenue",
                "41787",
                "MG",
                "(608) 460-2614"
            ],
            [
                "Arcu Et Pede LLP",
                "Ap #769-7735 Rutrum St.",
                "13609",
                "WV",
                "(495) 212-6856"
            ],
            [
                "Enim Inc.",
                "Ap #713-4701 Neque St.",
                "006996",
                "Lazio",
                "(418) 428-8354"
            ],
            [
                "Nunc Ac Corporation",
                "P.O. Box 160, 3260 Lorem Street",
                "195811",
                "CA",
                "(775) 871-3144"
            ],
            [
                "Aliquet Libero Integer Consulting",
                "P.O. Box 586, 2802 Ipsum Rd.",
                "91710-311",
                "San José",
                "(X25) X22-7318"
            ],
            [
                "Lorem Vehicula Consulting",
                "Ap #336-2810 Metus Rd.",
                "2466",
                "Andalucía",
                "(706) 926-0433"
            ],
            [
                "Lorem Sit Industries",
                "Ap #991-8793 Fringilla Rd.",
                "4141",
                "RM",
                "(894) 939-9077"
            ],
            [
                "Purus Ac Tellus Corp.",
                "P.O. Box 434, 7631 Nisi St.",
                "626703",
                "Quebec",
                "(173) 325-8680"
            ],
            [
                "Lobortis Risus PC",
                "P.O. Box 490, 8560 Arcu St.",
                "2440",
                "WA",
                "(427) 951-0166"
            ],
            [
                "Nam Company",
                "262-9134 Mollis Rd.",
                "C45 9FS",
                "SP",
                "(869) 645-1026"
            ],
            [
                "Fusce Corp.",
                "489-8534 Dolor. Road",
                "84358-857",
                "PR",
                "(360) 233-1165"
            ],
            [
                "Pellentesque Eget Dictum LLP",
                "Ap #724-2114 Vivamus St.",
                "242799",
                "Alaska",
                "(991) 562-0294"
            ],
            [
                "Adipiscing LLC",
                "471-8511 Et Rd.",
                "432412",
                "Arkansas",
                "(175) 418-5425"
            ],
            [
                "Urna Limited",
                "P.O. Box 389, 6663 Malesuada Rd.",
                "647563",
                "HH",
                "(390) 139-4318"
            ],
            [
                "Facilisis Institute",
                "922-3621 Est Road",
                "855657",
                "Stockholms län",
                "(947) 421-3074"
            ],
            [
                "Eros Turpis LLC",
                "Ap #425-6779 Et, Av.",
                "393346",
                "North Island",
                "(449) 923-8264"
            ],
            [
                "Proin Vel Arcu Corporation",
                "Ap #567-3817 Inceptos Rd.",
                "8775",
                "OV",
                "(218) 577-4960"
            ],
            [
                "Vulputate Institute",
                "P.O. Box 915, 1760 Etiam Av.",
                "553452",
                "HE",
                "(159) 694-3960"
            ],
            [
                "Sit Amet Limited",
                "Ap #383-4640 Diam St.",
                "3364",
                "North Island",
                "(716) 944-0280"
            ],
            [
                "In Limited",
                "6360 Aliquam Rd.",
                "551551",
                "JH",
                "(543) 330-6382"
            ],
            [
                "Fames Ac Industries",
                "Ap #342-3640 Leo. St.",
                "5335",
                "SAR",
                "(947) 574-3714"
            ],
            [
                "Elit Associates",
                "Ap #684-2044 Etiam St.",
                "N1K 6M5",
                "Connacht",
                "(217) 951-8620"
            ],
            [
                "Diam Lorem Auctor Limited",
                "Ap #311-4988 Magnis Ave",
                "R42 2AL",
                "Koc",
                "(291) 734-2668"
            ],
            [
                "Duis Mi Incorporated",
                "Ap #478-8942 Nec, St.",
                "PA60 2AV",
                "Bursa",
                "(844) 195-7034"
            ],
            [
                "Quisque Imperdiet Erat LLP",
                "Ap #583-4028 Tincidunt Rd.",
                "E1K 2Z9",
                "Vienna",
                "(727) 925-5080"
            ],
            [
                "Quisque Tincidunt Pede Consulting",
                "133-4355 Nulla. Road",
                "1955",
                "IX",
                "(724) 833-2050"
            ],
            [
                "Blandit Mattis PC",
                "Ap #247-5030 Suspendisse Rd.",
                "80466",
                "Hamburg",
                "(185) 629-0546"
            ],
            [
                "Dapibus Id Corp.",
                "171-7544 Enim Road",
                "5272",
                "Haryana",
                "(156) 527-7892"
            ],
            [
                "Dui Quis Accumsan Institute",
                "P.O. Box 776, 4182 Velit Rd.",
                "4341",
                "VII",
                "(637) 976-7564"
            ],
            [
                "Et Magnis Dis Associates",
                "1926 Malesuada Av.",
                "4442",
                "Dunbartonshire",
                "(400) 929-7467"
            ],
            [
                "Eleifend LLP",
                "P.O. Box 105, 7684 Libero Street",
                "219921",
                "Nevada",
                "(864) 149-1890"
            ],
            [
                "At Ltd",
                "305-2752 Lacinia St.",
                "38421",
                "Missouri",
                "(863) 936-9814"
            ],
            [
                "Eu Turpis Ltd",
                "550-5919 Tellus Rd.",
                "84360",
                "Alajuela",
                "(X24) X20-4669"
            ],
            [
                "Vel Mauris Integer Corp.",
                "756-1751 Curabitur St.",
                "53137",
                "North Island",
                "(817) 924-4678"
            ],
            [
                "Laoreet Posuere Limited",
                "Ap #869-5251 Pede, St.",
                "1136 OC",
                "LR",
                "(562) 898-5034"
            ],
            [
                "Vel Pede Blandit Incorporated",
                "4783 Sociosqu Rd.",
                "82053",
                "Vienna",
                "(124) 836-1787"
            ],
            [
                "Feugiat LLC",
                "9609 Id, Av.",
                "E2Y 3A3",
                "BE",
                "(946) 792-3778"
            ],
            [
                "Auctor Vitae Aliquet Institute",
                "Ap #708-7874 Eu Street",
                "9516",
                "Campania",
                "(298) 737-7840"
            ],
            [
                "Vestibulum Company",
                "P.O. Box 963, 6673 Eget Avenue",
                "787373",
                "TN",
                "(712) 803-9416"
            ],
            [
                "Eu Incorporated",
                "P.O. Box 774, 8775 Tristique Av.",
                "32454-374",
                "Anglesey",
                "(946) 165-5061"
            ],
            [
                "Vel Ltd",
                "637 Vitae St.",
                "98093",
                "North Island",
                "(352) 938-2565"
            ],
            [
                "Integer Foundation",
                "359-6507 A, Av.",
                "V2Z 3M6",
                "WP",
                "(596) 519-4678"
            ],
            [
                "Libero Lacus Varius Institute",
                "P.O. Box 835, 2941 Nulla. Av.",
                "71803",
                "Iowa",
                "(336) 457-5184"
            ],
            [
                "Vehicula Aliquet LLP",
                "984-287 Aenean Av.",
                "546929",
                "OV",
                "(755) 411-2359"
            ],
            [
                "Ligula Nullam Feugiat Industries",
                "Ap #938-1018 Scelerisque Rd.",
                "339502",
                "Van",
                "(163) 969-3711"
            ],
            [
                "Ut Corporation",
                "P.O. Box 929, 2679 Ut St.",
                "77044",
                "Osun",
                "(289) 380-3309"
            ],
            [
                "Vulputate Dui Industries",
                "7939 Nulla Avenue",
                "70805",
                "Lagos",
                "(681) 566-8515"
            ],
            [
                "Sed Company",
                "Ap #135-6170 Nam Av.",
                "935172",
                "RJ",
                "(170) 261-5388"
            ],
            [
                "Cum Sociis PC",
                "9701 Feugiat Avenue",
                "7355 WK",
                "Luxemburg",
                "(573) 465-2076"
            ],
            [
                "Vivamus Corp.",
                "Ap #619-2494 Arcu Street",
                "5567",
                "L",
                "(581) 291-5924"
            ],
            [
                "Faucibus Orci Luctus Associates",
                "Ap #278-5088 Consectetuer St.",
                "81703",
                "WA",
                "(977) 993-6942"
            ],
            [
                "Consequat Institute",
                "146-7707 Eu Avenue",
                "3586",
                "Berlin",
                "(787) 261-5416"
            ],
            [
                "Vel Pede Consulting",
                "254-8768 Cursus St.",
                "6047",
                "San José",
                "(X25) X22-6062"
            ],
            [
                "Mus Proin LLP",
                "Ap #148-4856 Cum Rd.",
                "7695 ZM",
                "Paraná",
                "(958) 869-6810"
            ],
            [
                "Nec Urna LLP",
                "Ap #102-9907 Mauris, Rd.",
                "Y0K 9X2",
                "PA",
                "(477) 592-6224"
            ],
            [
                "Nunc Pulvinar Arcu Incorporated",
                "Ap #405-7319 Tortor Ave",
                "74180",
                "NE",
                "(400) 641-0430"
            ],
            [
                "Egestas Urna Justo LLP",
                "P.O. Box 708, 3701 Sed Avenue",
                "24131",
                "Île-de-France",
                "(475) 275-7929"
            ],
            [
                "In LLP",
                "Ap #521-2211 Nonummy Av.",
                "585520",
                "Connacht",
                "(610) 810-7475"
            ],
            [
                "Nonummy Ut LLP",
                "Ap #409-2582 Turpis Rd.",
                "545272",
                "Montana",
                "(787) 939-4130"
            ],
            [
                "Vel Arcu Corporation",
                "765-3276 Velit. Road",
                "80333",
                "Catalunya",
                "(541) 398-8392"
            ],
            [
                "Nullam Vitae Diam Inc.",
                "696-777 Odio Street",
                "70045",
                "Ulster",
                "(910) 450-5630"
            ],
            [
                "Turpis In Institute",
                "9382 Mauris Street",
                "27939",
                "CM",
                "(186) 566-7429"
            ],
            [
                "Malesuada Augue Ut Inc.",
                "710-6596 Sed, St.",
                "99494",
                "Andalucía",
                "(646) 527-1935"
            ],
            [
                "Nunc Corporation",
                "616-7757 Sit Rd.",
                "59-530",
                "Oost-Vlaanderen",
                "(191) 981-3307"
            ],
            [
                "Ligula Eu LLC",
                "Ap #623-2625 Tincidunt St.",
                "89911",
                "Idaho",
                "(495) 853-5937"
            ],
            [
                "Ullamcorper Viverra Maecenas LLP",
                "P.O. Box 343, 1165 Phasellus Rd.",
                "33-840",
                "MA",
                "(915) 693-7760"
            ],
            [
                "Arcu Et Institute",
                "Ap #570-1260 Suspendisse Road",
                "12855",
                "Ontario",
                "(846) 456-1118"
            ],
            [
                "Nunc Nulla Associates",
                "6823 Eu Road",
                "32819",
                "Banffshire",
                "(263) 755-8909"
            ],
            [
                "Tristique Pharetra Industries",
                "8939 Non Avenue",
                "28327",
                "MI",
                "(823) 276-2862"
            ],
            [
                "Vitae Risus Duis Industries",
                "Ap #952-8641 Tellus Ave",
                "048827",
                "São Paulo",
                "(575) 465-3778"
            ],
            [
                "Semper Tellus Id Corporation",
                "8230 Ligula Avenue",
                "10-855",
                "UP",
                "(799) 668-9458"
            ],
            [
                "Et Company",
                "Ap #900-8544 Placerat, Rd.",
                "J3V 7Z8",
                "LU",
                "(422) 108-7292"
            ],
            [
                "Vivamus Industries",
                "Ap #970-6866 Proin Av.",
                "30401",
                "Z.",
                "(186) 745-7555"
            ],
            [
                "Nulla Facilisis Industries",
                "5696 Aliquet, St.",
                "6006",
                "Jigawa",
                "(192) 392-9426"
            ],
            [
                "Sed Pede Nec Limited",
                "P.O. Box 148, 4160 In Rd.",
                "30614",
                "C",
                "(X25) X72-4956"
            ],
            [
                "Magna Inc.",
                "Ap #485-7732 Amet Ave",
                "197424",
                "Istanbul",
                "(193) 965-7447"
            ],
            [
                "At Foundation",
                "322-5678 Malesuada St.",
                "73328",
                "SI",
                "(781) 665-6540"
            ],
            [
                "Auctor Mauris Corp.",
                "Ap #636-1705 Nec Rd.",
                "43478",
                "WV",
                "(465) 199-9216"
            ],
            [
                "Ut Nec LLC",
                "P.O. Box 214, 8144 Lorem. Street",
                "57-267",
                "QLD",
                "(948) 606-7989"
            ],
            [
                "Mollis Lectus Limited",
                "3532 Elit St.",
                "4681 OA",
                "E",
                "(923) 934-2989"
            ],
            [
                "Sit Amet Massa Incorporated",
                "Ap #384-3010 Parturient St.",
                "720071",
                "Bur",
                "(879) 848-4653"
            ],
            [
                "Lectus Nullam Limited",
                "P.O. Box 492, 7808 Purus Rd.",
                "70196",
                "Wie",
                "(711) 703-5993"
            ],
            [
                "Euismod Corporation",
                "P.O. Box 251, 1403 Malesuada Ave",
                "59706",
                "GL",
                "(243) 368-6920"
            ],
            [
                "Sed Consequat Industries",
                "P.O. Box 305, 9231 Gravida. Av.",
                "6809",
                "North Island",
                "(982) 396-5908"
            ],
            [
                "Erat Neque Corporation",
                "5841 Ut Street",
                "19877",
                "Madrid",
                "(381) 881-5758"
            ],
            [
                "Sit LLP",
                "4033 Id, Ave",
                "276777",
                "OY",
                "(696) 523-6096"
            ],
            [
                "Aliquet Odio Etiam Inc.",
                "503-7432 Nisi St.",
                "19830",
                "Aquitaine",
                "(294) 502-5204"
            ],
            [
                "Aenean Euismod Corporation",
                "Ap #593-7398 Felis, Avenue",
                "9436",
                "MV",
                "(874) 455-3833"
            ],
            [
                "Non Dapibus Ltd",
                "3482 Arcu Ave",
                "7254 PY",
                "ON",
                "(524) 969-8243"
            ],
            [
                "Vulputate Risus A Inc.",
                "628-582 Imperdiet, Rd.",
                "59649-956",
                "Kansas",
                "(234) 490-6593"
            ],
            [
                "Suspendisse Aliquet Molestie Consulting",
                "6297 Est Avenue",
                "75-331",
                "Podkarpackie",
                "(561) 121-9639"
            ],
            [
                "Quam Pellentesque Habitant Limited",
                "P.O. Box 200, 6116 Enim. St.",
                "425371",
                "Coquimbo",
                "(467) 617-4954"
            ],
            [
                "Orci Tincidunt Adipiscing Ltd",
                "200-3704 Sagittis St.",
                "E6W 1G9",
                "HI",
                "(168) 391-3176"
            ],
            [
                "Donec Sollicitudin Adipiscing Industries",
                "189-3529 Dapibus St.",
                "224095",
                "Madhya Pradesh",
                "(470) 892-5540"
            ],
            [
                "Gravida Aliquam Tincidunt Consulting",
                "P.O. Box 846, 1066 Lectus Ave",
                "986073",
                "MT",
                "(954) 813-8858"
            ],
            [
                "Augue Sed Molestie Foundation",
                "P.O. Box 385, 8729 Quisque Avenue",
                "62511",
                "VIC",
                "(525) 478-8564"
            ],
            [
                "Ut Aliquam Iaculis PC",
                "Ap #822-976 Feugiat Road",
                "30711",
                "Namen",
                "(228) 211-4158"
            ],
            [
                "Sed Institute",
                "5442 Tincidunt Rd.",
                "58330",
                "Wie",
                "(265) 795-3965"
            ],
            [
                "Morbi Tristique Senectus Ltd",
                "3538 Luctus. Avenue",
                "38-046",
                "Vlaams-Brabant",
                "(932) 297-9782"
            ],
            [
                "Vel Inc.",
                "110-6513 Phasellus St.",
                "638256",
                "HB",
                "(777) 728-5571"
            ],
            [
                "Posuere Enim Incorporated",
                "8349 Cras Rd.",
                "100738",
                "Mississippi",
                "(145) 686-0813"
            ],
            [
                "Eu Sem Pellentesque Inc.",
                "P.O. Box 888, 2193 Congue, Avenue",
                "00536",
                "Luik",
                "(115) 296-4403"
            ],
            [
                "Massa Foundation",
                "1604 Feugiat Avenue",
                "13914",
                "Ontario",
                "(623) 448-6350"
            ],
            [
                "Arcu Curabitur Ut Industries",
                "P.O. Box 179, 3767 Amet Ave",
                "13043-827",
                "Jharkhand",
                "(425) 157-1974"
            ],
            [
                "Gravida Sit Amet Consulting",
                "Ap #773-8898 Scelerisque Av.",
                "47797",
                "Rutland",
                "(826) 605-6515"
            ],
            [
                "Diam Luctus Lobortis Company",
                "P.O. Box 129, 5231 Sed Av.",
                "84002",
                "Madrid",
                "(395) 907-9506"
            ],
            [
                "Et Associates",
                "760-9120 Egestas Rd.",
                "2430",
                "L",
                "(724) 273-3157"
            ],
            [
                "Sagittis Corp.",
                "Ap #601-9173 In St.",
                "545020",
                "AZ",
                "(612) 133-8954"
            ],
            [
                "Hymenaeos Mauris Ut Corporation",
                "737-7317 Eget Avenue",
                "T4J 5C7",
                "AB",
                "(810) 427-0314"
            ],
            [
                "Quam Inc.",
                "2653 Nam Avenue",
                "10506",
                "QC",
                "(768) 474-3433"
            ],
            [
                "Risus Duis A Ltd",
                "Ap #250-685 Ante St.",
                "74017",
                "Victoria",
                "(241) 607-8125"
            ],
            [
                "Massa Integer Vitae Corp.",
                "P.O. Box 533, 5455 Mauris Avenue",
                "4007",
                "Noord Holland",
                "(898) 581-5362"
            ],
            [
                "Aliquet Vel Vulputate Inc.",
                "Ap #670-259 Consectetuer St.",
                "3894",
                "O",
                "(991) 171-4665"
            ],
            [
                "Primis In Inc.",
                "758-1336 Fusce Ave",
                "564698",
                "NI",
                "(498) 896-1033"
            ],
            [
                "Nulla Ante Limited",
                "7102 Sem Road",
                "19737-578",
                "AN",
                "(254) 877-7547"
            ],
            [
                "Etiam Gravida Molestie Foundation",
                "108-8867 Vitae, Road",
                "21618",
                "Queensland",
                "(631) 744-0345"
            ],
            [
                "Vel Consulting",
                "P.O. Box 759, 1039 Ut Road",
                "4706",
                "AN",
                "(313) 825-7411"
            ],
            [
                "Enim Corporation",
                "481-2847 Sociis Street",
                "99-477",
                "Wyoming",
                "(493) 274-5028"
            ],
            [
                "Blandit Institute",
                "P.O. Box 270, 1863 Lectus. Av.",
                "35850",
                "Karnataka",
                "(929) 757-9071"
            ],
            [
                "Ac Fermentum Industries",
                "401-1988 Vel St.",
                "953403",
                "North Island",
                "(634) 221-9601"
            ],
            [
                "Ligula LLC",
                "Ap #589-9000 Risus Road",
                "40031",
                "Arica y Parinacota",
                "(806) 126-9536"
            ],
            [
                "Iaculis Institute",
                "P.O. Box 215, 3196 Malesuada Ave",
                "4816",
                "Lubelskie",
                "(588) 264-5562"
            ],
            [
                "Vehicula Et Inc.",
                "625-3638 Felis. Rd.",
                "9498 QH",
                "HI",
                "(473) 711-1900"
            ],
            [
                "Vivamus LLP",
                "P.O. Box 781, 6104 Mauris Rd.",
                "76881",
                "BR",
                "(100) 402-5690"
            ],
            [
                "Magnis Dis Parturient Ltd",
                "Ap #549-6598 Primis Rd.",
                "66147-169",
                "SJ",
                "(X25) X81-8402"
            ],
            [
                "Ultricies Ligula Nullam Institute",
                "P.O. Box 602, 7237 Est St.",
                "B65 2TG",
                "OV",
                "(155) 278-0685"
            ],
            [
                "Eu Ligula Limited",
                "Ap #225-6824 Egestas Avenue",
                "70773",
                "Missouri",
                "(203) 423-4474"
            ],
            [
                "Non Luctus Sit LLP",
                "162-9264 Eget St.",
                "74988",
                "Bahia",
                "(430) 901-4786"
            ],
            [
                "Quis Incorporated",
                "5638 Aliquam Road",
                "48987",
                "BC",
                "(481) 355-0818"
            ],
            [
                "Justo Eu Industries",
                "Ap #278-4142 Eleifend Street",
                "57392",
                "BD",
                "(184) 385-1730"
            ],
            [
                "Risus In Mi PC",
                "2182 Vulputate, St.",
                "B9A 3P1",
                "Stockholms län",
                "(997) 778-5079"
            ],
            [
                "Phasellus Dolor Elit Consulting",
                "Ap #935-5925 Nulla Road",
                "15644",
                "Adana",
                "(961) 126-9248"
            ],
            [
                "Risus Donec Nibh Industries",
                "318-7135 Elit, Rd.",
                "17215",
                "AB",
                "(144) 370-4758"
            ],
            [
                "Sit Amet LLC",
                "P.O. Box 122, 7929 Tincidunt. Ave",
                "84633",
                "ON",
                "(736) 975-0607"
            ],
            [
                "Eget Company",
                "463-9763 Fusce Rd.",
                "2545",
                "WM",
                "(727) 625-4798"
            ],
            [
                "Enim Nunc Ut Incorporated",
                "639-5122 Donec Street",
                "YD2V 9SC",
                "San José",
                "(X25) X77-9840"
            ],
            [
                "Massa Quisque Company",
                "3097 Consectetuer Street",
                "32364",
                "N.",
                "(154) 974-9775"
            ],
            [
                "Erat Inc.",
                "P.O. Box 290, 5625 Pede, Road",
                "61205",
                "PD",
                "(121) 916-4132"
            ],
            [
                "Leo LLC",
                "954 Et Avenue",
                "91013",
                "LOM",
                "(822) 835-8403"
            ],
            [
                "Et Magnis Dis Corp.",
                "P.O. Box 204, 8636 Ut St.",
                "916801",
                "W",
                "(678) 851-7499"
            ],
            [
                "Molestie In Institute",
                "304-6691 Lacus. Avenue",
                "51014",
                "Mississippi",
                "(136) 444-7739"
            ],
            [
                "Est Arcu Ac Industries",
                "P.O. Box 170, 6971 Mi. Road",
                "5313",
                "Roxburghshire",
                "(695) 186-2973"
            ],
            [
                "Vestibulum Company",
                "6490 Turpis St.",
                "E5N 7Z2",
                "Louisiana",
                "(716) 722-0144"
            ],
            [
                "Sagittis Felis Inc.",
                "Ap #952-747 Ornare, Street",
                "567716",
                "X",
                "(723) 298-9715"
            ],
            [
                "Orci Luctus Et LLP",
                "890-6343 Lacus Rd.",
                "P1G 7B0",
                "São Paulo",
                "(752) 195-2162"
            ],
            [
                "Massa Non Institute",
                "P.O. Box 686, 1799 Sodales St.",
                "X4J 8K2",
                "Berkshire",
                "(866) 708-9499"
            ],
            [
                "Donec Est Foundation",
                "922-8068 Ante Rd.",
                "73024",
                "Stirlingshire",
                "(645) 278-6585"
            ],
            [
                "Egestas LLP",
                "P.O. Box 297, 8843 Convallis, Rd.",
                "3388",
                "MH",
                "(845) 358-7518"
            ],
            [
                "Nunc PC",
                "Ap #402-1519 Penatibus Avenue",
                "59850",
                "F",
                "(701) 662-6036"
            ],
            [
                "Odio Aliquam PC",
                "125-4099 Magna. Av.",
                "N5B 0A8",
                "Vlaams-Brabant",
                "(934) 812-5700"
            ],
            [
                "Semper Rutrum Fusce Institute",
                "P.O. Box 440, 4704 Risus Ave",
                "3932",
                "Mazowieckie",
                "(451) 695-5406"
            ],
            [
                "Natoque LLP",
                "P.O. Box 795, 1051 Nisl. Road",
                "3935",
                "QLD",
                "(408) 394-6536"
            ],
            [
                "Accumsan Convallis Ante Consulting",
                "476-8148 Elit Rd.",
                "9621 KT",
                "NW",
                "(662) 980-8081"
            ],
            [
                "Elit PC",
                "739-8990 Congue Street",
                "81131",
                "Andhra Pradesh",
                "(933) 401-4202"
            ],
            [
                "Dolor Fusce Industries",
                "P.O. Box 624, 666 Dictum Avenue",
                "39040",
                "KN",
                "(789) 941-6182"
            ],
            [
                "Leo Associates",
                "637-8998 Amet Road",
                "50124",
                "Catalunya",
                "(821) 793-2867"
            ],
            [
                "At Egestas Industries",
                "849-264 Arcu. Street",
                "24661",
                "WB",
                "(958) 809-5546"
            ],
            [
                "Massa Foundation",
                "P.O. Box 130, 5700 Ligula Street",
                "6473 PZ",
                "Comunitat Valenciana",
                "(779) 936-4877"
            ],
            [
                "Nec Inc.",
                "Ap #491-7650 Erat St.",
                "R6Y 7B2",
                "NSW",
                "(548) 909-7116"
            ],
            [
                "Malesuada Consulting",
                "Ap #989-6438 Molestie Rd.",
                "38709",
                "Ontario",
                "(826) 587-4554"
            ],
            [
                "Euismod Ac Foundation",
                "Ap #377-6279 Penatibus Rd.",
                "9934",
                "Ontario",
                "(395) 512-3659"
            ],
            [
                "Ut LLP",
                "281-9098 Eget, St.",
                "32199-702",
                "TOS",
                "(680) 323-3367"
            ],
            [
                "Vitae Consulting",
                "9756 Donec Av.",
                "3049",
                "Sląskie",
                "(871) 302-3877"
            ],
            [
                "Sed Tortor Company",
                "812-9133 Quisque Street",
                "31458",
                "NI",
                "(805) 915-8754"
            ],
            [
                "Bibendum Institute",
                "P.O. Box 455, 3265 Nascetur Rd.",
                "48058",
                "Metropolitana de Santiago",
                "(889) 623-9186"
            ],
            [
                "Tempus Inc.",
                "Ap #739-2725 Eros Rd.",
                "31912",
                "Västra Götalands län",
                "(424) 463-5406"
            ],
            [
                "Mattis Integer Consulting",
                "P.O. Box 564, 3679 Velit. Road",
                "46754",
                "KP",
                "(975) 228-7653"
            ],
            [
                "Massa Rutrum Magna Institute",
                "3767 Vivamus St.",
                "7398",
                "E",
                "(941) 563-0091"
            ],
            [
                "Leo Industries",
                "358-7992 Sem St.",
                "42854",
                "UP",
                "(677) 355-2740"
            ],
            [
                "Libero Proin Corporation",
                "P.O. Box 550, 7635 Est. St.",
                "93865",
                "Zl",
                "(385) 575-0388"
            ],
            [
                "Vel Limited",
                "P.O. Box 303, 280 Euismod Road",
                "HO3 3RZ",
                "LX",
                "(339) 254-5774"
            ],
            [
                "Adipiscing Company",
                "432-5907 Lacinia. Av.",
                "2794",
                "Veneto",
                "(594) 885-9295"
            ],
            [
                "Ornare Lectus Justo Industries",
                "P.O. Box 626, 8980 Suspendisse Av.",
                "62-893",
                "C",
                "(916) 382-7332"
            ],
            [
                "Adipiscing Associates",
                "Ap #424-5338 Nisl Av.",
                "7974",
                "Cornwall",
                "(983) 965-8668"
            ],
            [
                "Semper Foundation",
                "705-5794 Eu Ave",
                "3229",
                "Oost-Vlaanderen",
                "(710) 945-0136"
            ],
            [
                "Curabitur Dictum Phasellus LLP",
                "171-1834 Sem Street",
                "36971",
                "Zeeland",
                "(870) 157-6460"
            ],
            [
                "Faucibus Leo In LLC",
                "Ap #308-6897 Mauris Street",
                "60711",
                "BR",
                "(276) 224-7475"
            ],
            [
                "Volutpat Nulla Corp.",
                "Ap #621-8197 Non Road",
                "7628",
                "Renfrewshire",
                "(184) 799-1180"
            ],
            [
                "Ac Orci LLC",
                "Ap #539-5950 Orci. Rd.",
                "6163",
                "Podlaskie",
                "(253) 790-8946"
            ],
            [
                "Amet Risus Associates",
                "249-4845 Et Ave",
                "49565",
                "MI",
                "(896) 160-5499"
            ],
            [
                "Aliquet PC",
                "759-4671 Mus. Road",
                "9013",
                "Pays de la Loire",
                "(170) 664-1610"
            ],
            [
                "Metus Sit LLC",
                "487-5484 Eu St.",
                "91771",
                "Ist",
                "(571) 282-0288"
            ],
            [
                "Scelerisque Scelerisque PC",
                "9426 Ligula. Avenue",
                "YD7 4OY",
                "Overijssel",
                "(813) 498-0472"
            ],
            [
                "A Associates",
                "6514 Eu St.",
                "X6P 0N3",
                "O",
                "(325) 872-3063"
            ],
            [
                "Nulla Corp.",
                "4569 Malesuada. Avenue",
                "13967",
                "ERM",
                "(927) 826-4159"
            ],
            [
                "Egestas Blandit Nam Incorporated",
                "Ap #134-6681 Fusce Av.",
                "3865",
                "TN",
                "(433) 998-9115"
            ],
            [
                "Maecenas Iaculis Institute",
                "Ap #996-4377 Sed Rd.",
                "55218",
                "Bauchi",
                "(721) 344-6051"
            ],
            [
                "Rutrum Magna Cras Corp.",
                "P.O. Box 974, 3822 Dui Rd.",
                "40111",
                "CE",
                "(947) 442-5793"
            ],
            [
                "Lorem Ipsum Foundation",
                "5343 Sem Street",
                "98457",
                "E",
                "(761) 875-5900"
            ],
            [
                "Donec Elementum LLC",
                "4102 Nam St.",
                "09722",
                "SP",
                "(638) 211-7166"
            ],
            [
                "Ac Urna Ut LLP",
                "530-8009 Accumsan Ave",
                "060772",
                "West-Vlaanderen",
                "(431) 540-3105"
            ],
            [
                "Euismod Ac Associates",
                "804-355 A Rd.",
                "2152",
                "C",
                "(193) 216-0477"
            ],
            [
                "Fermentum Vel Company",
                "Ap #845-9216 Fringilla Road",
                "62467",
                "VIC",
                "(112) 247-1545"
            ],
            [
                "Sagittis Lobortis Foundation",
                "567-5227 Sed St.",
                "71804",
                "HA",
                "(976) 244-4458"
            ],
            [
                "Orci Tincidunt Industries",
                "4668 Ligula Rd.",
                "85683",
                "Rio de Janeiro",
                "(722) 415-4717"
            ],
            [
                "Non Inc.",
                "Ap #847-2482 Erat Av.",
                "8671 XH",
                "Lombardia",
                "(927) 804-2418"
            ],
            [
                "Libero Mauris Aliquam Corp.",
                "512-3506 Orci Road",
                "02721",
                "NI",
                "(673) 248-6754"
            ],
            [
                "Orci LLP",
                "665-7934 Nisi. Ave",
                "15735-588",
                "AN",
                "(123) 330-0610"
            ],
            [
                "Magnis Dis Consulting",
                "562-6935 Accumsan Rd.",
                "71125",
                "Mazowieckie",
                "(685) 710-6095"
            ]
        ]

    }
    //Loop the data and create companies in db
    myData.data.forEach(element => {
        const empresa = new Empresa({
            nome: element[0],
            morada: element[1],
            codigo_postal: element[2],
            freguesia: element[3],  
            telefone: element[4],
            searched: 0
        })
        empresa.save()
    })
    return res.json(
        { "code": "200", "msg": "Data created successfully" }
    )
})




module.exports = router