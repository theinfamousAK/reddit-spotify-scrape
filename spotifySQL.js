// Setup node functions
// =============================================================
require("dotenv").config();
var keys = require("./keys");
var Spotify = require("node-spotify-api");

// Setup MySql
// =============================================================
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "h2cwrn74535xdazj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "r3fk7motovq38x7d",
    password: "r07kl17y3p4snxcg",
    database: "gvw7pe966nc47xrf"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

// Scrape Functions
// =============================================================
rMusicScrape();
// rElectronicMusicScrape();
// rHipHopHeadsScrape();
// rRockScrape();
// rMetalScrape();

// ---------/r/music scrape---------
function rMusicScrape() {

    connection.query("TRUNCATE TABLE rMusic", function (err, res) {
        if (err) throw err;
    });
    connection.query("SELECT * FROM rMusicData", function (err, res) {
        if (err) throw err;
        
        for (i = 0; i < res.length; i++) {

            var query = "'" + res[i].reddit_post + "'";
            console.log(query);
            var noSquareQuery = query.replace(/\s*\[.*?\]\s*/g, '');
            console.log(noSquareQuery)
            var noYearQuery = noSquareQuery.replace(/\(\d+\)/g, '');
            console.log(noYearQuery);
            var spotifyQuery = noYearQuery.replace(" - ", " ")
            console.log(spotifyQuery);

            var spotify = new Spotify(keys.spotify);

            spotify.search({
                type: "track",
                query: spotifyQuery,
                limit: 1
            }, function (err, data) {
                if (err) {
                    console.log("Error occurred: " + err);
                    return;
                } else {
                    console.log("-------------------------");
                    console.log("Song: " + data.tracks.items[0].name);
                    console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
                    console.log("Album: " + data.tracks.items[0].album.name);
                    console.log("Preview link: " + data.tracks.items[0].external_urls.spotify);
                    console.log("-------------------------");

                    var sql = "INSERT INTO rMusic (song, artist, album, preview_link) VALUES " + "('" +
                        data.tracks.items[0].name + "', '" +
                        data.tracks.items[0].album.artists[0].name + "', '" +
                        data.tracks.items[0].album.name + "', '" +
                        data.tracks.items[0].external_urls.spotify + "')";
                    console.log(sql);
                    connection.query(sql, function (err) {
                        if (err) {
                            console.log("Error occurred: " + err);
                            return;
                        } else {
                            console.log("1 record inserted");
                        };
                    });
                }
            });
        }
    });
    // nextScrapeElectronicMusic();
    exit();
};
// ---------------------------------------

// ---------/r/electronicmusic scrape---------
function rElectronicMusicScrape() {
    connection.query("TRUNCATE TABLE rElectronicMusic", function (err, res) {
        if (err) throw err;
    });
    connection.query("SELECT * FROM rElectronicMusicData", function (err, res) {
        if (err) throw err;

        for (i = 0; i < res.length; i++) {

            var query = "'" + res[i].reddit_post + "'";
            console.log(query);
            var noSquareQuery = query.replace(/\s*\[.*?\]\s*/g, '');
            console.log(noSquareQuery)
            var noYearQuery = noSquareQuery.replace(/\(\d+\)/g, '');
            console.log(noYearQuery);
            var spotifyQuery = noYearQuery.replace(" - ", " ")
            console.log(spotifyQuery);

            var spotify = new Spotify(keys.spotify);

            spotify.search({
                type: "track",
                query: spotifyQuery,
                limit: 1
            }, function (err, data) {
                if (err) {
                    console.log("Error occurred: " + err);
                    return;
                } else {
                    console.log("-------------------------");
                    console.log("Song: " + data.tracks.items[0].name);
                    console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
                    console.log("Album: " + data.tracks.items[0].album.name);
                    console.log("Preview link: " + data.tracks.items[0].external_urls.spotify);
                    console.log("-------------------------");

                    var sql = "INSERT INTO rElectronicMusic (song, artist, album, preview_link) VALUES " + "('" +
                        data.tracks.items[0].name + "', '" +
                        data.tracks.items[0].album.artists[0].name + "', '" +
                        data.tracks.items[0].album.name + "', '" +
                        data.tracks.items[0].external_urls.spotify + "')";
                    console.log(sql);
                    connection.query(sql, function (err) {
                        if (err) {
                            console.log("Error occurred: " + err);
                            return;
                        } else {
                            console.log("1 record inserted");
                        };
                    });
                }
            });
        }
    });
    nextScrapeHipHopHeadsMusic();
};
// ---------------------------------------

// ---------/r/hiphopheads scrape---------
function rHipHopHeadsScrape() {
    connection.query("TRUNCATE TABLE rHipHopHeads", function (err, res) {
        if (err) throw err;
    });
    connection.query("SELECT * FROM rHipHopHeadsData", function (err, res) {
        if (err) throw err;

        for (i = 0; i < res.length; i++) {

            var query = "'" + res[i].reddit_post + "'";
            console.log(query);
            var noSquareQuery = query.replace(/\s*\[.*?\]\s*/g, '');
            console.log(noSquareQuery)
            var noYearQuery = noSquareQuery.replace(/\(\d+\)/g, '');
            console.log(noYearQuery);
            var spotifyQuery = noYearQuery.replace(" - ", " ")
            console.log(spotifyQuery);

            var spotify = new Spotify(keys.spotify);

            spotify.search({
                type: "track",
                query: spotifyQuery,
                limit: 1
            }, function (err, data) {
                if (err) {
                    console.log("Error occurred: " + err);
                    return;
                } else {
                    console.log("-------------------------");
                    console.log("Song: " + data.tracks.items[0].name);
                    console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
                    console.log("Album: " + data.tracks.items[0].album.name);
                    console.log("Preview link: " + data.tracks.items[0].external_urls.spotify);
                    console.log("-------------------------");

                    var sql = "INSERT INTO rHipHopHeads (song, artist, album, preview_link) VALUES " + "('" +
                        data.tracks.items[0].name + "', '" +
                        data.tracks.items[0].album.artists[0].name + "', '" +
                        data.tracks.items[0].album.name + "', '" +
                        data.tracks.items[0].external_urls.spotify + "')";
                    console.log(sql);
                    connection.query(sql, function (err) {
                        if (err) {
                            console.log("Error occurred: " + err);
                            return;
                        } else {
                            console.log("1 record inserted");
                        };
                    });
                }
            });
        }
    });
    nextScrapeRockMusic();
};
// ---------------------------------------

// ---------/r/rock scrape---------
function rRockScrape() {
    connection.query("TRUNCATE TABLE rRock", function (err, res) {
        if (err) throw err;
    });
    connection.query("SELECT * FROM rRockData", function (err, res) {
        if (err) throw err;

        for (i = 0; i < res.length; i++) {

            var query = "'" + res[i].reddit_post + "'";
            console.log(query);
            var noSquareQuery = query.replace(/\s*\[.*?\]\s*/g, '');
            console.log(noSquareQuery)
            var noYearQuery = noSquareQuery.replace(/\(\d+\)/g, '');
            console.log(noYearQuery);
            var spotifyQuery = noYearQuery.replace(" - ", " ")
            console.log(spotifyQuery);

            var spotify = new Spotify(keys.spotify);

            spotify.search({
                type: "track",
                query: spotifyQuery,
                limit: 1
            }, function (err, data) {
                if (err) {
                    console.log("Error occurred: " + err);
                    return;
                } else {
                    console.log("-------------------------");
                    console.log("Song: " + data.tracks.items[0].name);
                    console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
                    console.log("Album: " + data.tracks.items[0].album.name);
                    console.log("Preview link: " + data.tracks.items[0].external_urls.spotify);
                    console.log("-------------------------");

                    var sql = "INSERT INTO rRock (song, artist, album, preview_link) VALUES " + "('" +
                        data.tracks.items[0].name + "', '" +
                        data.tracks.items[0].album.artists[0].name + "', '" +
                        data.tracks.items[0].album.name + "', '" +
                        data.tracks.items[0].external_urls.spotify + "')";
                    console.log(sql);
                    connection.query(sql, function (err) {
                        if (err) {
                            console.log("Error occurred: " + err);
                            return;
                        } else {
                            console.log("1 record inserted");
                        };
                    });
                }
            });
        }
    });
    nextScrapeMetalMusic();
};
// ---------------------------------------

// ---------/r/metal scrape---------
function rMetalScrape() {
    connection.query("TRUNCATE TABLE rMetal", function (err, res) {
        if (err) throw err;
    });
    connection.query("SELECT * FROM rMetalData", function (err, res) {
        if (err) throw err;

        for (i = 0; i < res.length; i++) {

            var query = "'" + res[i].reddit_post + "'";
            console.log(query);
            var noSquareQuery = query.replace(/\s*\[.*?\]\s*/g, '');
            console.log(noSquareQuery)
            var noYearQuery = noSquareQuery.replace(/\(\d+\)/g, '');
            console.log(noYearQuery);
            var spotifyQuery = noYearQuery.replace(" - ", " ")
            console.log(spotifyQuery);

            var spotify = new Spotify(keys.spotify);

            spotify.search({
                type: "track",
                query: spotifyQuery,
                limit: 1
            }, function (err, data) {
                if (err) {
                    console.log("Error occurred: " + err);
                    return;
                } else {
                    console.log("-------------------------");
                    console.log("Song: " + data.tracks.items[0].name);
                    console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
                    console.log("Album: " + data.tracks.items[0].album.name);
                    console.log("Preview link: " + data.tracks.items[0].external_urls.spotify);
                    console.log("-------------------------");

                    var sql = "INSERT INTO rMetal (song, artist, album, preview_link) VALUES " + "('" +
                        data.tracks.items[0].name + "', '" +
                        data.tracks.items[0].album.artists[0].name + "', '" +
                        data.tracks.items[0].album.name + "', '" +
                        data.tracks.items[0].external_urls.spotify + "')";
                    console.log(sql);
                    connection.query(sql, function (err) {
                        if (err) {
                            console.log("Error occurred: " + err);
                            return;
                        } else {
                            console.log("1 record inserted");
                        };
                    });
                }
            });
        }
    });
    exit();
};
// ---------------------------------------

// Timeout functions
// =============================================================
function nextScrapeElectronicMusic() {
    var t = setTimeout(function () {
        rElectronicMusicScrape();
    }, 20000);
    // allow process to exist naturally before the timer if it is ready to
    t.unref();
};

function nextScrapeHipHopHeadsMusic() {
    var t = setTimeout(function () {
        rHipHopHeadsScrape();
    }, 20000);
    // allow process to exist naturally before the timer if it is ready to
    t.unref();
};

function nextScrapeRockMusic() {
    var t = setTimeout(function () {
        rRockScrape();
    }, 20000);
    // allow process to exist naturally before the timer if it is ready to
    t.unref();
};

function nextScrapeMetalMusic() {
    var t = setTimeout(function () {
        rMetalScrape();
    }, 20000);
    // allow process to exist naturally before the timer if it is ready to
    t.unref();
};

// ---------exit function---------
function exit() {
    var t = setTimeout(function () {
        process.exit(1);
    }, 20000);
    // allow process to exist naturally before the timer if it is ready to
    t.unref();
};