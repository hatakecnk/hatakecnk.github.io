new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Uchiage Hanabi",
          artist: "Daoko x Kenshi Yonezu",
          cover: "http://hatakecnk.ueuo.com/music/img/uchiagehanabi.jpeg",
          source: "http://hatakecnk.ueuo.com/music/mp3/uchiagehanabi.mp3",
          url: "https://youtu.be/-tKVN2mAKRI",
          favorited: true,
          lyrics: [
            {time: 0, text: 'ini lirik'},
            {time: 5, text: '-----'},
            { time: 23, text: 'Ano hi miwatashita nagisa wo ima mo omoidasu n da' },
            { time: 33, text: 'Suna no ue ni kizanda kotoba kimi no ushirosugata' },
            { time: 43, text: 'Yoridasu nami ga ashimoto wo yogiri nani ka wo sarau' },
            { time: 53, text: 'Yūnagi no naka higure dake ga tourisugite iku' },
            { time: 61.5, text: '-----' },
            { time: 63, text: 'Patto hikatte saita hanabi wo mite ita' },
            { time: 68, text: 'Kitto mada owaranai natsu da' },
            // { time: 33, text: 'Kono yoru ga tsuzuite hoshikatta' },
            // { time: 33, text: 'Ato nando to kimi to onaji hanabi wo mirarerukanatte' },
            // { time: 33, text: 'Warau kao ni nani ga dekiru darou ka' },
            // { time: 33, text: 'Kizutsuku koto yorokobu koto kurikaesu nami to joudou' },
            // { time: 33, text: 'Shousou saishū ressha no oto' },
            { time: 99, text: '' }
          ]
        },
        {
          name: "Nandemonaiya",
          artist: "RADWIMPS",
          cover: "http://hatakecnk.ueuo.com/music/img/nandemonaiya.png",
          source: "http://hatakecnk.ueuo.com/music/mp3/nandemonaiya.mp3",
          url: "https://youtu.be/kKX4NMGGZMo",
          favorited: true,
          lyrics: [
            {time: 0, text: 'ini lirik'}
          ]
        },
        {
          name: "Sparkle",
          artist: "RADWIMPS",
          cover: "http://hatakecnk.ueuo.com/music/img/sparkle.jpg",
          source: "https://github.com/hatakecnk/music/blob/master/sparkle.mp3?raw=true",
          url: "https://youtu.be/a2GujJZfXpg",
          favorited: false
        },
        {
          name: "Grand Escape (ft. Toko Miura)",
          artist: "RADWIMPS",
          cover: "http://hatakecnk.ueuo.com/music/img/grandescape.jpg",
          source: "http://hatakecnk.ueuo.com/music/mp3/grandescape.mp3",
          url: "https://youtu.be/Zne4Is1rKgc",
          favorited: true
        },
        {
          name: "Darkside",
          artist: "Alan Walker",
          cover: "http://hatakecnk.ueuo.com/music/img/Darkside.jpg",
          source: "http://hatakecnk.ueuo.com/music/mp3/1.mp3",
          url: "https://youtu.be/M-P4QBt-FWw",
          favorited: false
        },
        {
          name: "Fight Back",
          artist: "NEFFEX",
          cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQA9q657CWo-dn3XYZ-G0KjthyNZo0V1p0fcCaEdAOnBrvfbJDu&usqp=CAU",
          source: "http://hatakecnk.ueuo.com/music/mp3/2.mp3",
          url: "https://youtu.be/CYDP_8UTAus",
          favorited: false
        },
        {
          name: "Prism (feat. Laura Brehm)",
          artist: "Summer Was Fun",
          cover: "https://linkstorage.linkfire.com/medialinks/images/e22fa590-8383-4346-b15d-c5cf84b4511f/artwork-440x440.jpg",
          source: "http://hatakecnk.ueuo.com/music/mp3/Prism.mp3",
          url: "https://www.youtube.com/watch?v=Jp1Ka8ZmNFQ",
          favorited: false
        },
        {
          name: "Dreams Pt.II (feat. Sara Skinner)",
          artist: "Lost Sky",
          cover: "https://i1.sndcdn.com/artworks-000546308880-i6lfz1-t500x500.jpg",
          source: "http://hatakecnk.ueuo.com/music/mp3/DreamsPt.II.mp3",
          url: "https://www.youtube.com/watch?v=L7kF4MXXCoA",
          favorited: true
        },
        {
          name: "Where We Started (feat. Jex)",
          artist: "Lost Sky",
          cover: "https://images.genius.com/8f401b71d07acf83114f27744c544fa1.440x440x1.jpg",
          source: "http://hatakecnk.ueuo.com/music/mp3/WhereWeStarted.mp3",
          url: "https://www.youtube.com/watch?v=U9pGr6KMdyg",
          favorited: true
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null,
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    updateLyric() {
      const currentTime = this.audio.currentTime;
      const currentLyrics = this.currentTrack.lyrics;
    
      // Temukan indeks lirik berdasarkan waktu saat ini
      for (let i = 0; i < currentLyrics.length; i++) {
        if (currentLyrics[i].time > currentTime) {
          this.currentLyricIndex = i - 1;
          break;
        }
      }
    
      // Ambil teks lirik sesuai dengan indeks yang ditemukan
      if (this.currentLyricIndex >= 0) {
        this.currentLyricText = currentLyrics[this.currentLyricIndex].text;
      } else {
        // Jika tidak ada lirik pada waktu saat ini, tampilkan lirik terakhir
        this.currentLyricIndex = currentLyrics.length - 1;
        this.currentLyricText = currentLyrics[this.currentLyricIndex].text;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },

  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
      vm.updateLyric();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
      vm.updateLyric();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      vm.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
