import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetterBox from "../components/NewsLetterBox";
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px]"
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            FOREVER is your one-stop shop for premium fashion. Discover a
            diverse range of high-quality apparel, accessories, and footwear
            that cater to every style and occasion. Our carefully curated
            collection features the latest trends and timeless classics,
            ensuring you always look your best. Our user-friendly website,
            secure payment options, and exceptional customer service make it
            easy for you to find and purchase the perfect pieces for your
            wardrobe.
          </p>
          <p>
            FOREVER is committed to sustainable and ethical fashion. We source
            our products responsibly and prioritize eco-friendly materials and
            practices. Shop with confidence knowing that your purchases make a
            positive impact on the planet. Our commitment to value ensures that
            you can look great without breaking the bank. Discover our wide
            range of options and find the perfect pieces to suit your budget and
            style.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            FOREVER is dedicated to inspiring and empowering individuals to
            express their unique style through our curated collection of fashion
            products. We believe that fashion is a form of self-expression and
            strive to provide our customers with a diverse range of options that
            cater to their individual tastes and preferences. By offering
            high-quality, affordable, and sustainable fashion, we aim to make a
            positive impact on the world while helping our customers look and
            feel their best.
          </p>
        </div>
      </div>
      <div className="text-2xl py-4">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            FOREVER is committed to delivering products of the highest quality.
            Our rigorous quality assurance processes ensure that every item
            meets our stringent standards. From sourcing materials to final
            inspection, we meticulously examine each product to guarantee its
            durability, craftsmanship, and overall excellence.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col">
          <b>Convenience:</b>
          <p className="">
            FOREVER offers a convenient and seamless shopping experience. Our
            user-friendly website and mobile app allow you to browse and shop
            our collection with ease. Enjoy fast and reliable shipping,
            hassle-free returns, and excellent customer support.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col">
          <b>Execeptional Customer Service:</b>
          <p className="">
            FOREVER prides itself on providing exceptional customer service. Our
            dedicated team of customer service representatives is always ready
            to assist you with any questions or concerns. Whether you need help
            placing an order, tracking your shipment, or returning an item, we
            &apos;re here to ensure your satisfaction. Contact us through our
            website, email, or phone for prompt and friendly assistance.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
}

export default About