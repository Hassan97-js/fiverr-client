import { Link } from "react-router-dom";

import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiPinterestFill,
  RiTwitterFill
} from "react-icons/ri";

import CustomIcon from "./custom-icon";
import Heading2 from "./typography/heading-2";
import LayoutSection from "./layout/layout-section";

import assetsData from "../assets";
const { footerLogoSVG } = assetsData.svgs;

const Footer = () => {
  return (
    <footer>
      <LayoutSection>
        <nav className="grid grid-cols-footer-auto-fit gap-x-[1.5em] gap-y-[2em]">
          <ul role="list">
            <Heading2 className="mb-5">Categories</Heading2>

            <div className="flex flex-col gap-4 max-w-[20ch]">
              <li>
                <Link to=".">Graphics & Design</Link>
              </li>
              <li>
                <Link to=".">Digital Marketing</Link>
              </li>
              <li>
                <Link to=".">Writing & Translation</Link>
              </li>
              <li>
                <Link to="."> Video & Animation</Link>
              </li>
              <li>
                <Link to=".">Music & Audio</Link>
              </li>
              <li>
                <Link to=".">Programming & Tech</Link>
              </li>
              <li>
                <Link to=".">Data</Link>
              </li>
              <li>
                <Link to=".">Business</Link>
              </li>
              <li>
                <Link to=".">Lifestyle</Link>
              </li>
              <li>
                <Link to=".">Photography</Link>
              </li>
              <li>
                <Link to=".">Sitemap</Link>
              </li>
            </div>
          </ul>

          <ul role="list" className="item">
            <Heading2 className="mb-5">About</Heading2>
            <div className="flex flex-col gap-4 max-w-[20ch]">
              <li>
                <Link to=".">Press & News</Link>
              </li>
              <li>
                <Link to=".">Partnerships</Link>
              </li>
              <li>
                <Link to=".">Privacy Policy</Link>
              </li>
              <li>
                <Link to=".">Terms of Service</Link>
              </li>
              <li>
                <Link to=".">Intellectual Property Claims</Link>
              </li>
              <li>
                <Link to=".">Investor Relations</Link>
              </li>
              <li>
                <Link to=".">Contact Sales</Link>
              </li>
            </div>
          </ul>

          <ul role="list" className="item">
            <Heading2 className="mb-5">Support</Heading2>
            <div className="flex flex-col gap-4 max-w-[20ch]">
              <li>
                <Link to=".">Help & Support</Link>
              </li>
              <li>
                <Link to=".">Trust & Safety</Link>
              </li>
              <li>
                <Link to=".">Selling on Liverr</Link>
              </li>
              <li>
                <Link to=".">Buying on Liverr</Link>
              </li>
            </div>
          </ul>

          <ul role="list" className="item">
            <Heading2 className="mb-5">Community</Heading2>
            <div className="flex flex-col gap-4 max-w-[20ch]">
              <li>
                <Link to=".">Customer Success Stories</Link>
              </li>
              <li>
                <Link to=".">Community hub</Link>
              </li>
              <li>
                <Link to=".">Forum</Link>
              </li>
              <li>
                <Link to=".">Events</Link>
              </li>
              <li>
                <Link to=".">Blog</Link>
              </li>
              <li>
                <Link to=".">Influencers</Link>
              </li>
              <li>
                <Link to=".">Affiliates</Link>
              </li>
              <li>
                <Link to=".">Podcast</Link>
              </li>
              <li>
                <Link to=".">Invite a Friend</Link>
              </li>
              <li>
                <Link to=".">Become a Seller</Link>
              </li>
              <li>
                <Link to=".">Community Standards</Link>
              </li>
            </div>
          </ul>

          <ul role="list" className="item">
            <Heading2 className="mb-5">More From Fiverr</Heading2>
            <div className="flex flex-col gap-4 max-w-[20ch]">
              <li>
                <Link to=".">Liverr Business</Link>
              </li>
              <li>
                <Link to=".">Liverr Pro</Link>
              </li>
              <li>
                <Link to=".">Liverr Logo Maker</Link>
              </li>
              <li>
                <Link to=".">Liverr Guides</Link>
              </li>
              <li>
                <Link to=".">Get Inspired</Link>
              </li>
              <li>
                <Link to=".">Liverr Select</Link>
              </li>
              <li>
                <Link to=".">ClearVoice</Link>
              </li>
              <li>
                <Link to=".">Liverr Workspace</Link>
              </li>
              <li>
                <Link to=".">Learn</Link>
              </li>
              <li>
                <Link to=".">Working Not Working</Link>
              </li>
            </div>
          </ul>
        </nav>

        <hr className="block w-full my-8 bg-zinc-200" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-col md:flex-row gap-3">
            <img src={footerLogoSVG} alt="fiverr logo" width="70" />
            <p className="mt-3">&copy; Fiverr International Ltd. 2023</p>
          </div>

          <div className="flex md:justify-center items-center gap-6 py-2">
            <CustomIcon Icon={RiFacebookCircleFill} className="text-zinc-500" size="2em" aria-label="A facebook logo" />

            <CustomIcon Icon={RiInstagramFill} className="text-zinc-500" size="2em" aria-label="An instagram logo" />

            <CustomIcon Icon={RiPinterestFill} className="text-zinc-500" size="2em" aria-label="A pinterest logo" />

            <CustomIcon Icon={RiLinkedinBoxFill} className="text-zinc-500" size="2em" aria-label="A linkedIn logo" />

            <CustomIcon Icon={RiTwitterFill} className="text-zinc-500" size="2em" aria-label="A twitter logo" />
          </div>
        </div>
      </LayoutSection>
    </footer>
  );
};

export default Footer;
