import React, { useState } from "react";

const menuItems = [
  {
    name: "みたらし",
    desc: "甘じょっぱいタレが香ばしい、定番の味。",
    price: "250円",
  },
  {
    name: "こしあん",
    desc: "上品な甘さのこしあんをたっぷりと。",
    price: "250円",
  },
  {
    name: "黒ごま",
    desc: "香ばしい黒ごまの風味豊かな一串。",
    price: "250円",
  },
  {
    name: "くるみ味噌",
    desc: "くるみの食感と味噌のコクが絶妙。",
    price: "270円",
  },
  {
    name: "のり醤油",
    desc: "磯の香りと醤油の旨みをシンプルに。",
    price: "250円",
  },
  {
    name: "柚子みそ",
    desc: "爽やかな柚子の香りと味噌のまろやかさ。",
    price: "280円",
  },
];

const galleryImages = [
  {
    src: "/images/gallery-dango-dark.png",
    alt: "黒い背景の上に並ぶだんご",
  },
  {
    src: "/images/gallery-packaged-dango.png",
    alt: "透明ケースに入っただんご",
  },
  {
    src: "/images/gallery-wagashi-plate.png",
    alt: "白い皿に盛られた和菓子",
  },
  {
    src: "/images/gallery-gift-box.png",
    alt: "ギフト箱の写真",
  },
];

const newsItems = [
  {
    date: "2026.05.09",
    category: "お知らせ",
    title: "オフィシャルサイトを公開しました",
    body:
      "帯屋町だんごのオフィシャルサイトを公開しました。最新情報はこちらからお届けしてまいります。",
  },
  {
    date: "2026.04.20",
    category: "イベント",
    title: "グランドオープン日程が決まりました",
    body:
      "高知市帯屋町1丁目にて、近日グランドオープン予定です。詳細日程は決まり次第、本サイトおよびInstagramにてお知らせいたします。",
  },
  {
    date: "2026.04.01",
    category: "メニュー",
    title: "季節限定「柚子みそ」を加えました",
    body:
      "爽やかな柚子の香りと味噌のまろやかさが調和した季節限定の一串をお品書きに加えました。",
  },
];

// お問い合わせ送信先メールアドレス（運用時に書き換えてください）
const CONTACT_EMAIL = "info@obiyamachi-dango.example.jp";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-4 text-[13px] tracking-[0.18em] text-neutral-700">
      <span className="h-6 w-px bg-neutral-900" />
      <span>{children}</span>
    </div>
  );
}

function ImageBlock({
  src,
  alt,
  className = "",
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  return (
    <div className={`relative overflow-hidden bg-neutral-200 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition duration-700 hover:scale-[1.025]"
        loading={loading}
      />
    </div>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("お問い合わせ");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = [
      `お名前: ${name}`,
      `ご連絡先メール: ${email}`,
      "",
      "お問い合わせ内容:",
      message,
    ].join("\n");

    const mailto =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(`【帯屋町だんご HP】${subject}`)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
      aria-label="お問い合わせフォーム"
    >
      <div>
        <label
          htmlFor="contact-name"
          className="mb-2 block text-[12px] tracking-[0.16em] text-neutral-700"
        >
          お名前 <span className="text-neutral-500">（必須）</span>
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-11 w-full border border-neutral-300 bg-white px-4 text-[14px] tracking-[0.06em] outline-none transition focus:border-neutral-900"
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="mb-2 block text-[12px] tracking-[0.16em] text-neutral-700"
        >
          メールアドレス <span className="text-neutral-500">（必須）</span>
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 w-full border border-neutral-300 bg-white px-4 text-[14px] tracking-[0.06em] outline-none transition focus:border-neutral-900"
        />
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="mb-2 block text-[12px] tracking-[0.16em] text-neutral-700"
        >
          ご用件
        </label>
        <select
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="h-11 w-full border border-neutral-300 bg-white px-4 text-[14px] tracking-[0.06em] outline-none transition focus:border-neutral-900"
        >
          <option>お問い合わせ</option>
          <option>ご注文・ご予約</option>
          <option>ギフト・詰め合わせのご相談</option>
          <option>取材・出店のご依頼</option>
          <option>その他</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-2 block text-[12px] tracking-[0.16em] text-neutral-700"
        >
          お問い合わせ内容 <span className="text-neutral-500">（必須）</span>
        </label>
        <textarea
          id="contact-message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-neutral-300 bg-white px-4 py-3 text-[14px] leading-[1.9] tracking-[0.06em] outline-none transition focus:border-neutral-900"
        />
      </div>

      <p className="text-[12px] leading-[1.9] tracking-[0.06em] text-neutral-500">
        ※ 送信ボタンを押すと、ご利用のメールアプリが起動します。内容をご確認のうえ送信してください。
      </p>

      <button
        type="submit"
        className="inline-flex h-14 w-full items-center justify-center border border-neutral-900 bg-neutral-900 text-[14px] tracking-[0.18em] text-white transition hover:bg-white hover:text-neutral-900 md:w-72"
      >
        送信する
        <span className="ml-6">→</span>
      </button>
    </form>
  );
}

export default function App() {
  return (
    <main className="min-h-screen bg-[#f7f3ee] font-serif text-[#26231f] antialiased">
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#fbf8f3]/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
          <a href="#top" className="block leading-none" aria-label="帯屋町だんご トップへ戻る">
            <div className="text-[24px] tracking-[0.18em] md:text-[28px]">帯屋町だんご</div>
            <div className="mt-2 text-[12px] tracking-[0.08em] text-neutral-600">Obiyamachi, Kochi</div>
          </a>

          <nav className="hidden items-center gap-10 text-[13px] tracking-[0.18em] text-neutral-700 md:flex" aria-label="メインナビゲーション">
            <a className="transition hover:text-black" href="#about">私たちについて</a>
            <a className="transition hover:text-black" href="#menu">お品書き</a>
            <a className="transition hover:text-black" href="#gallery">ギャラリー</a>
            <a className="transition hover:text-black" href="#news">お知らせ</a>
            <a className="transition hover:text-black" href="#access">アクセス</a>
            <a className="transition hover:text-black" href="#contact">お問い合わせ</a>
          </nav>

          <div className="grid h-10 w-10 place-items-center md:hidden" aria-hidden="true">
            <span className="block h-px w-6 bg-neutral-800 before:mt-[-7px] before:block before:h-px before:w-6 before:bg-neutral-800 after:mt-[7px] after:block after:h-px after:w-6 after:bg-neutral-800" />
          </div>
        </div>
      </header>

      <section id="top" className="relative min-h-[580px] overflow-hidden bg-[#242424] md:min-h-[690px]">
        <ImageBlock
          src="/images/hero-dango.png"
          alt="石板の上に並ぶ帯屋町だんごの串だんご"
          className="absolute inset-0"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,20,20,0.62),rgba(20,20,20,0.18)_48%,rgba(20,20,20,0.04))]" />

        <div className="relative mx-auto flex min-h-[580px] max-w-7xl items-center px-6 py-28 md:min-h-[690px] md:px-10">
          <div className="max-w-[520px] text-white">
            <h1 className="text-[44px] font-normal leading-[1.55] tracking-[0.12em] md:text-[66px]">
              気軽に、<br />
              ちゃんと美味しい。
            </h1>
            <div className="my-9 h-px w-20 bg-white/70" />
            <p className="text-[16px] leading-[2.15] tracking-[0.13em] text-white/88 md:text-[18px]">
              高知の日常に寄り添う、<br />
              新しいかたちのだんご専門店。<br />
              素材の持ち味をいかした、<br />
              やさしくて、奥深い味わいをどうぞ。
            </p>
          </div>
        </div>
      </section>

      <section id="about" className="grid border-b border-black/5 md:grid-cols-2">
        <div className="flex min-h-[520px] items-center px-6 py-20 md:px-16 lg:px-24">
          <div className="max-w-xl">
            <SectionLabel>私たちについて</SectionLabel>
            <h2 className="text-[30px] font-normal leading-[1.85] tracking-[0.12em] md:text-[38px]">
              高知県高知市帯屋町1丁目に<br />
              だんご専門店がはじまります。
            </h2>
            <p className="mt-10 text-[15px] leading-[2.35] tracking-[0.08em] text-neutral-700 md:text-[16px]">
              伝統的な和菓子の技と、今の暮らしに合う感性を大切に。<br />
              ひと串から気軽に楽しめる、やさしい美味しさをお届けします。<br />
              お茶のおともに、手土産に、日常の小さなごほうびに。<br />
              帯屋町から、ほっとする時間をお届けできたら嬉しいです。
            </p>
          </div>
        </div>
        <ImageBlock
          src="/images/plate-wagashi.png"
          alt="白い皿に盛られた小さな和菓子"
          className="min-h-[440px] md:min-h-[620px]"
        />
      </section>

      <section id="menu" className="grid border-b border-black/5 md:grid-cols-2">
        <ImageBlock
          src="/images/packaged-dango.png"
          alt="透明なケースに入った持ち帰り用だんご"
          className="min-h-[520px] md:min-h-[680px]"
        />

        <div className="flex min-h-[620px] items-center px-6 py-20 md:px-16 lg:px-24">
          <div className="w-full max-w-xl">
            <SectionLabel>お品書き（お持ち帰り）</SectionLabel>

            <div className="space-y-6">
              {menuItems.map((item) => (
                <div key={item.name} className="grid grid-cols-[1fr_auto] gap-6">
                  <div>
                    <h3 className="text-[17px] font-semibold tracking-[0.12em]">{item.name}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed tracking-[0.08em] text-neutral-600">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-1 text-[16px] tracking-[0.08em]">{item.price}</div>
                </div>
              ))}
            </div>

            <div className="mt-16 border-t border-neutral-300 pt-10">
              <div className="grid gap-8 md:grid-cols-[1fr_220px] md:items-end">
                <div>
                  <h3 className="text-[18px] font-normal tracking-[0.16em]">詰め合わせ・ギフト箱</h3>
                  <p className="mt-5 text-[14px] leading-[2] tracking-[0.08em] text-neutral-600">
                    大切な方への贈り物や、手土産に。<br />
                    ご予算やご希望に合わせてご用意します。
                  </p>
                </div>
                <ImageBlock
                  src="/images/gift-box.png"
                  alt="だんごの詰め合わせギフト箱"
                  className="h-28 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>ギャラリー</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryImages.map((image) => (
              <ImageBlock
                key={image.src}
                src={image.src}
                alt={image.alt}
                className="aspect-[1.35/1]"
              />
            ))}
          </div>
        </div>
      </section>

      <section id="news" className="border-y border-black/5 bg-[#fbf8f3] px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>お知らせ</SectionLabel>
          <div className="mt-2 max-w-3xl">
            <ul className="divide-y divide-neutral-300">
              {newsItems.map((item) => (
                <li key={item.date + item.title} className="grid gap-3 py-7 md:grid-cols-[140px_120px_1fr] md:items-baseline md:gap-8">
                  <time className="text-[13px] tracking-[0.12em] text-neutral-600">{item.date}</time>
                  <span className="inline-flex h-7 w-fit items-center justify-center border border-neutral-400 px-3 text-[11px] tracking-[0.18em] text-neutral-700">
                    {item.category}
                  </span>
                  <div>
                    <h3 className="text-[16px] font-normal leading-[1.7] tracking-[0.10em] md:text-[17px]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[13px] leading-[2] tracking-[0.06em] text-neutral-600">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="access" className="grid border-t border-black/5 md:grid-cols-[0.42fr_0.58fr]">
        <div className="flex min-h-[430px] items-center px-6 py-20 md:px-16 lg:px-20">
          <div>
            <SectionLabel>アクセス</SectionLabel>
            <h2 className="text-[28px] font-normal leading-[1.8] tracking-[0.12em] md:text-[34px]">
              高知県高知市帯屋町1丁目
            </h2>
            <div className="mt-9 flex items-center gap-4 text-[24px] tracking-[0.08em] md:text-[30px]">
              <span className="grid h-7 w-7 place-items-center rounded-full border border-neutral-500 text-[14px]">◷</span>
              <span>10:00–18:00</span>
            </div>
            <p className="mt-4 text-[13px] tracking-[0.08em] text-neutral-600">
              ※オープン前のため、変更となる場合がございます。
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=%E9%AB%98%E7%9F%A5%E7%9C%8C%E9%AB%98%E7%9F%A5%E5%B8%82%E5%B8%AF%E5%B1%8B%E7%94%BA1%E4%B8%81%E7%9B%AE"
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex h-14 w-64 items-center justify-center border border-neutral-500 text-[14px] tracking-[0.08em] transition hover:bg-neutral-900 hover:text-white"
            >
              Google Mapで見る
              <span className="ml-8">→</span>
            </a>
          </div>
        </div>
        <ImageBlock
          src="/images/storefront.png"
          alt="帯屋町だんごの店舗外観"
          className="min-h-[430px]"
        />
      </section>

      <section id="contact" className="border-t border-black/5 px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[0.42fr_0.58fr] md:gap-20">
          <div>
            <SectionLabel>お問い合わせ</SectionLabel>
            <h2 className="text-[28px] font-normal leading-[1.7] tracking-[0.12em] md:text-[32px]">
              ご注文・取材のご依頼、<br />
              お気軽にどうぞ。
            </h2>
            <p className="mt-9 text-[14px] leading-[2.15] tracking-[0.08em] text-neutral-700 md:text-[15px]">
              ギフトのご相談、店頭での承りについて、<br />
              取材や出店のご依頼など、お気軽にお問い合わせください。<br />
              通常2〜3営業日以内にご返信いたします。
            </p>
            <dl className="mt-10 space-y-4 text-[13px] leading-[1.9] tracking-[0.08em] text-neutral-700">
              <div className="grid grid-cols-[80px_1fr] items-baseline gap-4">
                <dt className="text-neutral-500">メール</dt>
                <dd>
                  <a className="underline-offset-4 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[80px_1fr] items-baseline gap-4">
                <dt className="text-neutral-500">受付</dt>
                <dd>10:00 – 18:00</dd>
              </div>
            </dl>
          </div>

          <div className="bg-[#fbf8f3] p-8 md:p-12">
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="bg-[#242424] px-6 py-10 text-white md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-[24px] tracking-[0.18em]">帯屋町だんご</div>
            <div className="mt-2 text-[12px] tracking-[0.08em] text-white/65">Obiyamachi, Kochi</div>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-4 text-[13px] tracking-[0.18em] text-white/72">
            <a className="transition hover:text-white" href="#about">私たちについて</a>
            <a className="transition hover:text-white" href="#menu">お品書き</a>
            <a className="transition hover:text-white" href="#gallery">ギャラリー</a>
            <a className="transition hover:text-white" href="#news">お知らせ</a>
            <a className="transition hover:text-white" href="#access">アクセス</a>
            <a className="transition hover:text-white" href="#contact">お問い合わせ</a>
          </nav>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/60 text-sm transition hover:bg-white hover:text-neutral-900"
          >
            ◎
          </a>
        </div>
        <p className="mx-auto mt-10 max-w-7xl text-center text-[11px] tracking-[0.12em] text-white/45">
          © Obiyamachi Dango All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}
