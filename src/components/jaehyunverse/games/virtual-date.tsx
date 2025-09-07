"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import GlassCard from "../shared/glass-card";
import { RotateCcw } from "lucide-react";

interface Choice {
  text: string;
  nextScene: string;
}

interface Scene {
  image: string;
  imageHint: string;
  text: string;
  choices: Choice[];
  isEnding?: boolean;
}

interface Story {
  [key: string]: Scene;
}

const story: Story = {
  start: {
    image: "/match2.png",
    imageHint: "cafe interior",
    text: 'Kamu tiba di kafe yang sudah kalian janjikan. Tak lama, Jaehyun datang sambil tersenyum. "Sudah lama menunggu?" sapanya hangat. "Mau pesan apa?"',
    choices: [
      { text: "Pesan Americano, sama sepertinya.", nextScene: "americano" },
      { text: "Pesan Peach Smoothie, favoritmu.", nextScene: "smoothie" },
    ],
  },
  americano: {
    image: "/two-coffes.png",
    imageHint: "two coffees",
    text: '"Pilihan yang klasik," katanya sambil tersenyum. Kalian menikmati kopi sambil mengobrol ringan. "Setelah ini, ada ide mau ke mana? Aku ingin ke suatu tempat yang tenang dan berarti."',
    choices: [
      { text: "Ajak ke toko buku.", nextScene: "bookstore" },
      { text: "Ajak jalan-jalan di taman.", nextScene: "park" },
    ],
  },
  smoothie: {
    image: "/two-coffes.png",
    imageHint: "colorful drinks",
    text: 'Jaehyun tertawa kecil melihat pesananmu. "Peach, ya? Pilihan yang manis, seperti kamu," katanya. Pipimu terasa hangat. "Setelah ini, mau melakukan sesuatu yang seru?"',
    choices: [
      { text: "Ajak main ke arcade.", nextScene: "arcade" },
      { text: "Ajak nonton film terbaru.", nextScene: "movie" },
    ],
  },
  bookstore: {
    image: "/jaehyun-toko-buku.png",
    imageHint: "cozy bookstore",
    text: 'Di toko buku, Jaehyun tampak sangat fokus melihat-lihat. "Buku apa yang biasanya kamu baca?" tanyanya, sambil menatapmu dengan tatapan penasaran.',
    choices: [
      { text: "Aku suka novel fiksi.", nextScene: "bookstore_fiction" },
      { text: "Aku lebih suka buku puisi.", nextScene: "bookstore_poetry" },
    ],
  },
  bookstore_fiction: {
    image: "/novel.png",
    imageHint: "novel books",
    text: '"Fiksi, ya? Dunia imajinasi memang tak terbatas." Dia lalu mengambil sebuah novel. "Kalau begitu, aku punya rekomendasi. Karakter utama di sini mengingatkanku padamu, kuat dan penuh kejutan." Dia membelikan buku itu untukmu.',
    choices: [{ text: "Terima kasih, Jaehyun!", nextScene: "dinner_intro" }],
  },
  bookstore_poetry: {
    image: "/puisi.png",
    imageHint: "poetry book open",
    text: 'Matanya berbinar. "Sama, aku juga." Dia mengambil buku puisi, membuka halaman acak dan membacakan sebuah bait, "Matamu adalah sajak terindah yang pernah kubaca." Hatimu berdebar kencang.',
    choices: [{ text: "(Tersipu malu)", nextScene: "dinner_intro" }],
  },
  dinner_intro: {
    image: "/menutup-buku.png",
    imageHint: "city street evening",
    text: 'Dia menutup buku itu sambil tersenyum. "Membaca membuatku lapar," katanya, memecah suasana. "Bagaimana kalau kita cari makan malam sekarang?"',
    choices: [{ text: "Ide bagus, ayo!", nextScene: "dinner_quiet" }],
  },
  dinner_quiet: {
    image: "/dinner.png",
    imageHint: "romantic dinner couple",
    text: 'Kalian makan malam di restoran Italia yang nyaman. Sepanjang makan, kalian membicarakan banyak hal, dari buku hingga mimpi. Caranya mendengarkan membuatmu merasa sangat spesial. "Terima kasih ya untuk hari ini," ucapnya saat mengantarmu pulang.',
    choices: [
      { text: "Akhiri kencan intelektual ini", nextScene: "bookstore_ending" },
    ],
  },
  bookstore_ending: {
    image: "/jaehyun-pergi.png",
    imageHint: "couple reading book",
    text: "Kencan yang tenang dan intelektual. Kamu pulang dengan sebuah buku baru di tangan dan sajak indah yang akan selalu kamu ingat. Jaehyun bukan hanya pangeran, tapi juga penyair dalam hidupmu. Malam ini, kamu melihat sisi dewasanya yang menenangkan.",
    choices: [{ text: "Kencan Lagi?", nextScene: "start" }],
    isEnding: true,
  },
  park: {
    image: "/jaehyun-taman.png",
    imageHint: "beautiful park sunset",
    text: 'Kalian berjalan santai di taman. Udara sore ini sangat sejuk. Saat senja mulai tiba, langit berubah warna menjadi keemasan. "Momen seperti ini jadi lebih spesial karena ada kamu," kata Jaehyun pelan.',
    choices: [
      { text: "Ajak mengobrol di bangku taman.", nextScene: "park_talk" },
      { text: "Ajak foto-foto dengan ponsel.", nextScene: "park_photo" },
    ],
  },
  park_talk: {
    image: "/jaehyun-bangku.png",
    imageHint: "couple talking on bench",
    text: 'Kalian duduk di bangku kayu, menikmati sisa senja. Jaehyun bercerita tentang harinya, dan kamu mendengarkan dengan saksama. "Aku merasa bisa menjadi diriku sendiri saat bersamamu," ucapnya tulus. Dia lalu menoleh padamu. "Apa momen paling membahagiakan buatmu hari ini?"',
    choices: [
      { text: '"Saat kamu bilang aku manis."', nextScene: "photobooth_intro" },
      {
        text: '"Momen ini. Saat kita ngobrol santai."',
        nextScene: "photobooth_intro",
      },
    ],
  },
  park_photo: {
    image: "/jaehyun-pose.png",
    imageHint: "phone photography",
    text: 'Kamu mengeluarkan ponselmu, dan Jaehyun langsung berpose. Kalian mengambil banyak foto konyol dan artistik dengan latar belakang senja. "Kamu fotografer pribadiku sekarang," katanya sambil tertawa melihat hasilnya.',
    choices: [{ text: "Tentu saja!", nextScene: "photobooth_intro" }],
  },
  photobooth_intro: {
    image: "/jaehyun-jalan-malam.png",
    imageHint: "couple walking pointing",
    text: 'Saat hari mulai gelap dan lampu taman menyala, kalian melihat sebuah photo booth di kejauhan. "Sepertinya seru," kata Jaehyun sambil menunjuk ke sana. "Mau coba? Untuk kenang-kenangan."',
    choices: [{ text: "Ayo!", nextScene: "photobooth" }],
  },
  photobooth: {
    image: "/jaehyun-photobooth.png",
    imageHint: "photo booth couple funny",
    text: 'Di dalam photo booth yang sempit, kalian berpose konyol dan tertawa bersama. Jaehyun memasang ekspresi lucu yang belum pernah kamu lihat sebelumnya. Hasil fotonya menjadi bukti nyata betapa menyenangkannya hari itu. "Simpan baik-baik ya," katanya sambil menyerahkan satu set foto padamu.',
    choices: [{ text: "Akhiri kencan manis ini", nextScene: "park_ending" }],
  },
  park_ending: {
    image: "https://picsum.photos/seed/date-end-park/800/600",
    imageHint: "couple silhouette sunset",
    text: "Di bawah lampu taman yang temaram dan dengan strip foto di tanganmu, kamu merasa menjadi orang paling beruntung. Kencan sederhana ini menjadi luar biasa karena momen-momen kecil yang manis dan tulus bersamanya. Hari ini, kamu melihat sisi hangat dan romantisnya.",
    choices: [{ text: "Kencan Lagi?", nextScene: "start" }],
    isEnding: true,
  },
  arcade: {
    image: "https://picsum.photos/seed/date-arcade/800/600",
    imageHint: "arcade games neon",
    text: 'Di dalam arcade yang berisik, sisi kompetitif Jaehyun keluar. Dia mengajarimu cara bermain basket dan balap mobil. "Kita tim!" serunya. "Kalau kita menang, hadiahnya untukmu. Kalau kalah, kamu traktir aku es krim. Deal?"',
    choices: [
      { text: "Deal!", nextScene: "arcade_game" },
      { text: "Tentu, aku pasti menang!", nextScene: "arcade_game" },
    ],
  },
  arcade_game: {
    image: "https://picsum.photos/seed/date-claw-machine/800/600",
    imageHint: "claw machine intense",
    text: 'Setelah mencoba berbagai permainan, kalian berhenti di depan mesin capit. Ada boneka peach yang lucu di dalamnya. "Aku akan dapatkan itu untukmu," kata Jaehyun dengan tatapan serius.',
    choices: [
      { text: "Semangat, Jaehyun!", nextScene: "arcade_prize" },
      { text: "Apa aku perlu membantumu?", nextScene: "arcade_prize" },
    ],
  },
  arcade_prize: {
    image: "https://picsum.photos/seed/date-arcade-prize/800/600",
    imageHint: "man holding doll",
    text: 'Setelah beberapa kali mencoba dengan gigih, Jaehyun berhasil! Dia menyerahkan boneka peach itu dengan bangga. "Untuk peach-ku," katanya sambil mengedipkan mata. "Sudah malam, aku antar kamu pulang ya?"',
    choices: [{ text: "Oke, terima kasih.", nextScene: "walk_home_fun" }],
  },
  walk_home_fun: {
    image: "https://picsum.photos/seed/date-home/800/600",
    imageHint: "couple walking at night",
    text: 'Sambil memeluk boneka peach pemberiannya, Jaehyun mengantarmu sampai depan rumah. "Aku senang sekali hari ini, rasanya lepas sekali," katanya. "Kita harus main lagi lain kali." Dia menatapmu sejenak sebelum akhirnya pamit.',
    choices: [{ text: "Akhiri kencan seru ini", nextScene: "arcade_ending" }],
  },
  arcade_ending: {
    image: "https://picsum.photos/seed/date-end-arcade/800/600",
    imageHint: "girl holding doll",
    text: "Kamu memeluk boneka peach itu erat-erat. Ini bukan sekadar boneka, tapi bukti dari tawa, semangat kompetitifnya, dan keinginannya untuk membuatmu bahagia hari ini. Malam ini, kamu melihat sisi ceria dan gigihnya yang menggemaskan.",
    choices: [{ text: "Kencan Lagi?", nextScene: "start" }],
    isEnding: true,
  },
  movie: {
    image: "https://picsum.photos/seed/date-movie-lobby/800/600",
    imageHint: "movie theater lobby",
    text: 'Di bioskop, kalian berdebat kecil tentang popcorn. "Asin atau manis?" tanya Jaehyun. "Atau kita beli keduanya saja, biar adil?"',
    choices: [
      { text: "Pilih popcorn asin.", nextScene: "movie_theater" },
      { text: "Pilih popcorn manis.", nextScene: "movie_theater" },
      { text: "Setuju, beli keduanya!", nextScene: "movie_theater" },
    ],
  },
  movie_theater: {
    image: "https://picsum.photos/seed/date-movie/800/600",
    imageHint: "cinema screen holding hands",
    text: "Di tengah film romantis, saat adegan yang mengharukan, kamu merasakan tangannya dengan lembut mencari dan menggenggam tanganmu di dalam kegelapan. Genggamannya hangat dan erat, membuatmu lupa pada film yang sedang diputar.",
    choices: [
      { text: "(Membalas genggamannya)", nextScene: "movie_ending_intro" },
    ],
  },
  movie_ending_intro: {
    image: "https://picsum.photos/seed/date-movie-exit/800/600",
    imageHint: "couple leaving cinema",
    text: 'Film selesai, tapi genggaman tangannya tak kunjung lepas bahkan saat kalian keluar dari teater. "Filmnya bagus," bisiknya, "tapi aku lebih suka bagian saat aku bisa memegang tanganmu." Udara di luar ternyata cukup dingin.',
    choices: [
      { text: "Sedikit...", nextScene: "jacket_moment" },
      { text: "Tidak apa-apa, kok!", nextScene: "jacket_moment" },
    ],
  },
  jacket_moment: {
    image: "https://picsum.photos/seed/date-jacket/800/600",
    imageHint: "man giving woman jacket",
    text: 'Tanpa ragu, Jaehyun melepas jaketnya dan menyampirkannya di bahumu. Aroma parfumnya yang khas langsung menyelimutimu. "Jangan sampai sakit," katanya lembut. Kalian berjalan pelan di bawah lampu jalan, menciptakan momen romantis yang sempurna.',
    choices: [
      { text: "Akhiri kencan mendebarkan ini", nextScene: "movie_ending" },
    ],
  },
  movie_ending: {
    image: "https://picsum.photos/seed/date-end-movie/800/600",
    imageHint: "woman wearing big jacket",
    text: "Kamu pulang dengan jaket Jaehyun yang masih melekat di tubuhmu. Kehangatan dan aroma parfumnya menjadi kenangan yang tak terlupakan. Bukan filmnya, tapi semua momen kecil bersamanya yang membuat malam ini sempurna. Kamu sadar, di balik sosoknya yang tenang, dia adalah orang yang sangat perhatian dan romantis.",
    choices: [{ text: "Kencan Lagi?", nextScene: "start" }],
    isEnding: true,
  },
};

export default function VirtualDateGame() {
  const [currentScene, setCurrentScene] = useState("start");

  const handleChoice = (nextScene: string) => {
    if (nextScene === "start") {
      // Reset to initial scene with a fade effect
      const card = document.getElementById("virtual-date-card");
      if (card) {
        card.style.opacity = "0";
        setTimeout(() => {
          setCurrentScene(nextScene);
          card.style.opacity = "1";
        }, 300);
      } else {
        setCurrentScene(nextScene);
      }
    } else {
      setCurrentScene(nextScene);
    }
  };

  const scene = story[currentScene];

  return (
    <GlassCard
      id="virtual-date-card"
      className="w-full max-w-2xl p-0 overflow-hidden transition-opacity duration-300"
    >
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={scene.image}
          alt={scene.imageHint}
          data-ai-hint={scene.imageHint}
          width={800}
          height={600}
          key={currentScene}
          className="object-cover w-full h-full animate-in fade-in duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="p-6 flex flex-col justify-between min-h-[200px]">
        <p className="text-foreground leading-relaxed mb-6">{scene.text}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scene.choices.map((choice, index) => (
            <Button
              key={index}
              onClick={() => handleChoice(choice.nextScene)}
              variant={scene.isEnding ? "default" : "outline"}
              className="h-auto py-3 whitespace-normal"
            >
              {scene.isEnding && <RotateCcw className="mr-2" />}
              {choice.text}
            </Button>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
