import Link from "next/link";
import { CONTACT } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="liens">
          <h3>Liens</h3>
          <div className="pills">
            <Link className="pill" href="/services">
              Services
            </Link>
            <Link className="pill" href="/problemes">
              Problèmes
            </Link>
            <Link className="pill" href="/assurances-rapports">
              Assurances & Rapports
            </Link>
            <Link className="pill" href="/a-propos">
              À propos
            </Link>
            <Link className="pill" href="/contact">
              Contact
            </Link>
            <Link className="pill pillPrimary" href="/urgence-24-7">
              Urgence 24/7
            </Link>
          </div>
        </div>

        <div className="contactContainer">
          <h3>Nous contacter</h3>
          <div className="contacts">
            <div className="singleContact">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={800}
                height={800}
                viewBox="0 0 32 32"
              >
                <title>{"pin"}</title>
                <path d="M4 12q0-3.264 1.6-6.016t4.384-4.352T16 0t6.016 1.632T26.4 5.984 28 12q0 1.376-.672 3.2t-1.696 3.68-2.336 3.776-2.56 3.584-2.336 2.944-1.728 2.08L16 32q-.256-.256-.672-.768t-1.696-2.016-2.368-3.008-2.528-3.52-2.368-3.84-1.696-3.616T4 12zm4 0q0 3.328 2.336 5.664T16 20t5.664-2.336T24 12t-2.336-5.632T16 4t-5.664 2.368T8 12z" />
              </svg>
              <p>{CONTACT.address}</p>
            </div>
            <div className="singleContact">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
                width={800}
                height={800}
                viewBox="0 0 64 64"
              >
                <path
                  d="M56 0H8C5.789 0 4 1.789 4 4v56c0 2.211 1.789 4 4 4h20V48h8v16h20c2.211 0 4-1.789 4-4V4c0-2.211-1.789-4-4-4zM28 40h-8v-8h8v8zm0-16h-8v-8h8v8zm16 16h-8v-8h8v8zm0-16h-8v-8h8v8z"
                />
              </svg>
              <p>{CONTACT.vat}</p>
            </div>
            <div className="singleContact">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={800}
                height={800}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5.5C3 14.06 9.94 21 18.5 21c.386 0 .77-.014 1.148-.042.435-.032.653-.048.851-.162a1.06 1.06 0 0 0 .402-.432c.099-.206.099-.446.099-.926v-2.817c0-.404 0-.606-.067-.779a.999.999 0 0 0-.277-.396c-.14-.122-.33-.191-.71-.329l-3.206-1.166c-.441-.16-.662-.24-.872-.227a1 1 0 0 0-.513.182c-.171.121-.292.322-.534.725L14 16a12.1 12.1 0 0 1-6-6l1.369-.821c.402-.242.604-.363.725-.534a1 1 0 0 0 .182-.513c.014-.21-.066-.43-.227-.872L8.883 4.053c-.138-.38-.207-.569-.329-.709a1 1 0 0 0-.396-.278C7.985 3 7.783 3 7.379 3H4.562c-.48 0-.72 0-.926.1a1.06 1.06 0 0 0-.432.401c-.114.198-.13.416-.162.85C3.014 4.732 3 5.115 3 5.5Z"
                />
              </svg>
              <p>
                {CONTACT.phone1} — {CONTACT.phone2}
              </p>
            </div>
            <div className="singleContact">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={800}
                height={800}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m21 8-3.56 1.978c-1.986 1.103-2.979 1.655-4.03 1.87-.93.192-1.89.192-2.82 0-1.051-.215-2.044-.767-4.03-1.87L3 8m3.2 11h11.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C21 17.48 21 16.92 21 15.8V8.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C19.48 5 18.92 5 17.8 5H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 6.52 3 7.08 3 8.2v7.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C4.52 19 5.08 19 6.2 19Z"
                />
              </svg>
              <p>{CONTACT.email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container copyright">
        <p>© 2025 AquaPro-Detect</p>
      </div>
    </footer>
  );
}
