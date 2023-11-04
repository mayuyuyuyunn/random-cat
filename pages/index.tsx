import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from './index.module.css';

const IndexPage: NextPage = () => {
  // useStateを使って状態を定義する
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  // マウント時に画像を読み込む宣言
  useEffect(() => {
    fetchImage().then(newImage => {
      setImageUrl(newImage.url); // 画像のURLの状態を更新する
      setLoading(false); // ローディング状態を更新する
    });
  }, []);

  // ボタンをクリックした時に画像を読み込む処理
  const handleClick = async () => {
    setLoading(true); // 読み込み中フラグを立てる
    const newImage = await fetchImage();
    setImageUrl(newImage.url); // 画像のURLの状態を更新する 
    setLoading(false); // 読み込み中フラグを倒す
  };
  // ローディング中でなかったら画像を表示する
  return(
    <div className={styles.page}>
    <button onClick={handleClick} className={styles.button}>
      他のにゃんこも見る
    </button>
    <div className={styles.frame}>
        {loading || <img src={imageUrl} className={styles.img} />}
      </div>
    </div>
  );
};

export default IndexPage;

type Image = {
  url: string;
}
const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search")
  const image = await res.json();
  console.log(image);
  return image[0];
}
