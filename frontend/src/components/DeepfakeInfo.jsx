import React from 'react';
import deepfakeImage from '../assets/deepfake_illustration.png';

const DeepfakeInfo = () => {
    return (
        <section className="section">
            <div className="container">
<<<<<<< HEAD
                <h2 style={{ marginBottom: '2rem' }}>Bahaya Deepfake & AIGC</h2>
=======
                <h2 style={{ marginBottom: '2rem' }}>Apa Itu AIGC & Deepfake?</h2>
>>>>>>> Ver4
                <div className="deepfake-layout">
                    <div>
                        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', textAlign: 'justify' }}>
                            AI Generated Content (AIGC) adalah konten digital seperti teks, gambar, audio, atau video yang dibuat secara otomatis menggunakan teknologi kecerdasan buatan. Salah satu bentuk AIGC yang banyak dikenal adalah deepfake, yaitu konten media hasil manipulasi AI yang menggunakan identitas individu seperti wajah, suara, atau tindakan seseorang secara sangat realistis meskipun tidak pernah terjadi. Namun, penyalahgunaan deepfake dapat menimbulkan berbagai dampak negatif, antara lain:
                        </p>
                        <ul style={{ paddingLeft: '1.5rem', color: '#94a3b8', lineHeight: '2', fontSize: '1.1rem' }}>
                            <li>Potensi penyebaran misinformasi dan hoax</li>
                            <li>Pelanggaran privasi dan pencurian identitas individu</li>
                            <li>Manipulasi opini publik dan penipuan digital</li>
                        </ul>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <img
                            src={deepfakeImage}
                            alt="Deepfake Illustration"
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '20px',
                                border: '1px solid #1e3a8a',
                                boxShadow: '0 0 20px rgba(30, 64, 175, 0.2)'
                            }}
                        />
                    </div>
                </div>
<<<<<<< HEAD
            </div>
=======

                {/* Section Horizontal Line */}
                <div style={{ width: '100%', height: '1px', background: 'rgba(30, 58, 138, 0.3)', margin: '4rem 0' }} />

                {/* Jurnal Penelitian Section */}
                <h2 className="text-center" style={{ marginBottom: '3rem' }}>Jurnal Penelitian Terkait AIGC & Deepfake</h2>

                <div className="flex-column" style={{ gap: '4rem' }}>
                    {/* Journal 1 (Left Preview, Right Desc) - REAL CONTENT */}
                    <div className="journal-row" style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: '2rem', alignItems: 'center' }}>
                        {/* Preview Area */}
                        <a href="/2019 Mika The Emergence of Deepfake Technology.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <div style={{
                                aspectRatio: '3/4',
                                backgroundColor: '#1e293b',
                                border: '1px solid #1e3a8a',
                                borderRadius: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                overflow: 'hidden'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(96, 165, 250, 0.3)';
                                    e.currentTarget.style.borderColor = '#60a5fa';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                                    e.currentTarget.style.borderColor = '#1e3a8a';
                                }}
                            >
                                <img
                                    src="/Preview 2019 Mika The Emergence of Deepfake Technology_page-0001.jpg"
                                    alt="Preview Journal 1"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover' // ensures the image covers the area without distortion
                                    }}
                                />
                            </div>
                        </a>

                        {/* Description Area */}
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f8fafc', fontFamily: 'var(--font-display)' }}>The Emergence of Deepfake Technology</h3>
                            <p style={{ textAlign: 'justify', fontSize: '1rem' }}>
                                Teknologi deepfake menimbulkan ancaman serius melalui pembuatan video manipulatif hiper-realistis yang dapat digunakan untuk <strong>sabotase politik, pornografi balas dendam (revenge porn), pemerasan, hingga penipuan keuangan</strong> melalui penyamaran identitas eksekutif secara real-time. Dampak luasnya mencakup gangguan pada keamanan nasional, manipulasi opini publik dalam pemilu, serta munculnya fenomena <strong>"apokaliptik informasi" atau apatis realitas</strong>, di mana masyarakat kehilangan kepercayaan terhadap kebenaran informasi karena sulitnya membedakan media asli dari yang palsu. Guna menangani ancaman ini, sumber menyarankan empat strategi utama: penerapan <strong>legislasi dan regulasi</strong> yang tegas terhadap pemalsuan identitas dan fitnah, kebijakan proaktif perusahaan media sosial untuk memoderasi dan menghapus konten palsu, serta <strong>pendidikan literasi digital</strong> sejak dini untuk mengasah pemikiran kritis masyarakat dalam menilai keaslian sumber informasi. Secara teknis, pencegahan dan penanganan juga dilakukan melalui pengembangan <strong>teknologi deteksi berbasis AI</strong>, sistem autentikasi konten menggunakan <strong>tanda air digital (digital watermarking)</strong>, pemanfaatan <strong>blockchain</strong> untuk melacak asal-usul media, serta penyisipan "noise" pada data visual untuk mencegah foto digunakan dalam perangkat lunak deepfake.
                            </p>
                        </div>
                    </div>

                    {/* Journal 2 (Layout Reversed: Left Desc, Right Preview) - REAL CONTENT */}
                    <div className="journal-row reverse-mobile" style={{ display: 'grid', gridTemplateColumns: '2fr minmax(250px, 1fr)', gap: '2rem', alignItems: 'center' }}>
                        {/* Description Area */}
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f8fafc', fontFamily: 'var(--font-display)' }}>A Study on Combating Emerging Threat of Deepfake Weaponization</h3>
                            <p style={{ textAlign: 'justify', fontSize: '1rem' }}>
                                Teknologi deepfake merupakan ancaman serius karena kemampuannya memicu bahaya seperti pembuatan pornografi non-konsensual untuk penghinaan, pencurian identitas, eksploitasi, pencemaran nama baik, hingga manipulasi bukti hukum. Dalam ranah yang lebih luas, deepfake dapat digunakan sebagai senjata untuk memengaruhi hasil pemilu, membantu rekrutmen kelompok teroris melalui konten pidato pejabat yang dipalsukan, mengacaukan pasar keuangan, bahkan mengecoh analis militer melalui manipulasi citra satelit. Selain itu, pemalsuan dokumen dan tanda tangan digital juga menjadi risiko besar yang perlu diwaspadai. Untuk menangani dan mencegah ancaman ini, dikembangkan berbagai metode deteksi canggih seperti model <strong>SSTNet</strong> yang menganalisis fitur spasial, temporal, dan steganalisis, serta deteksi inkonsistensi kedipan mata manusia. Langkah pencegahan teknis lainnya mencakup penggunaan <strong>stempel digital terenkripsi</strong> untuk autentikasi media, penyisipan "noise" khusus pada foto untuk menggagalkan algoritma pembuat deepfake, serta peran aktif platform media sosial dalam memperketat moderasi konten guna menghentikan penyebaran informasi palsu.
                            </p>
                        </div>

                        {/* Preview Area */}
                        <a href="/2020 Katarya A Study on Combating Emerging Threat of .pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <div style={{
                                aspectRatio: '3/4',
                                backgroundColor: '#1e293b',
                                border: '1px solid #1e3a8a',
                                borderRadius: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                overflow: 'hidden'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(96, 165, 250, 0.3)';
                                    e.currentTarget.style.borderColor = '#60a5fa';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                                    e.currentTarget.style.borderColor = '#1e3a8a';
                                }}
                            >
                                <img
                                    src="/Preview 2020 Katarya A Study on Combating Emerging Threat of _page-0001.jpg"
                                    alt="Preview Journal 2"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                        </a>
                    </div>

                    {/* Journal 3 (Standard Layout) - REAL CONTENT */}
                    <div className="journal-row" style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: '2rem', alignItems: 'center' }}>
                        {/* Preview Area */}
                        <a href="/2024 Brandqvist The Cybersecurity Threat of Deepfake.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <div style={{
                                aspectRatio: '3/4',
                                backgroundColor: '#1e293b',
                                border: '1px solid #1e3a8a',
                                borderRadius: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                overflow: 'hidden'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(96, 165, 250, 0.3)';
                                    e.currentTarget.style.borderColor = '#60a5fa';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                                    e.currentTarget.style.borderColor = '#1e3a8a';
                                }}
                            >
                                <img
                                    src="/Preview 2024 Brandqvist The Cybersecurity Threat of Deepfake_page-0001.jpg"
                                    alt="Preview Journal 3"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                        </a>

                        {/* Description Area */}
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f8fafc', fontFamily: 'var(--font-display)' }}>The Cybersecurity Threat of Deepfake</h3>
                            <p style={{ textAlign: 'justify', fontSize: '1rem' }}>
                                Teknologi deepfake menimbulkan ancaman serius terhadap keamanan siber melalui penyebaran <strong>misinformasi, pencurian identitas, dan penipuan keuangan</strong>, termasuk penggunaan video atau audio manipulatif untuk menyamar sebagai eksekutif guna mencuri data atau kredensial perusahaan. Dampak negatifnya meluas hingga manipulasi opini publik dalam proses demokrasi, pembuatan konten pornografi tanpa persetujuan, hingga praktik kloning suara untuk pemerasan. Untuk mencegah dan menangani risiko tersebut, sumber menekankan pentingnya pengembangan <strong>alat deteksi berbasis AI</strong> yang mampu mengenali anomali teknis, pemanfaatan teknologi <strong>blockchain</strong> untuk verifikasi otentisitas media, serta pembentukan <strong>kerangka regulasi dan undang-undang</strong> yang kuat guna menindak penyalahgunaan teknologi. Selain itu, strategi penanganan yang efektif harus melibatkan peningkatan <strong>literasi digital dan kesadaran publik</strong> agar masyarakat bersikap kritis terhadap konten digital, serta kolaborasi internasional untuk menetapkan standar etika penggunaan AI yang aman.
                            </p>
                        </div>
                    </div>

                    {/* Journal 4 (Layout Reversed) - REAL CONTENT */}
                    <div className="journal-row reverse-mobile" style={{ display: 'grid', gridTemplateColumns: '2fr minmax(250px, 1fr)', gap: '2rem', alignItems: 'center' }}>
                        {/* Description Area */}
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f8fafc', fontFamily: 'var(--font-display)' }}>The Emerging Threats of Deepfake Attacks and Countermeasures</h3>
                            <p style={{ textAlign: 'justify', fontSize: '1rem' }}>
                                Teknologi deepfake menimbulkan ancaman signifikan melalui manipulasi media yang dapat digunakan untuk menyebarkan <strong>disinformasi politik</strong> guna menyesatkan opini publik atau merusak hubungan diplomatik antarnegara. Dalam dunia bisnis, teknologi ini dimanfaatkan untuk <strong>penipuan keuangan</strong> dengan menyamar sebagai pejabat eksekutif (CEO) melalui suara atau video, serta berisiko membobol sistem keamanan biometrik seperti pemindai wajah. Selain itu, deepfake mengancam sistem peradilan melalui <strong>pemalsuan bukti</strong> audio atau video yang dapat memengaruhi hasil persidangan. Untuk mengatasi ancaman tersebut, sumber menyarankan penggunaan solusi teknis seperti <strong>Convolutional Neural Networks (CNNs)</strong> dan forensik digital untuk mendeteksi anomali pixel, serta pemanfaatan <strong>blockchain</strong> untuk melacak otentisitas dan asal-usul konten. Langkah pencegahan juga harus melibatkan <strong>pelatihan kesadaran karyawan</strong>, penerapan otentikasi dua langkah, pembatasan akses data visual di media sosial, serta pembentukan <strong>regulasi dan undang-undang</strong> yang tegas untuk mengkriminalisasi penyalahgunaan deepfake yang bersifat merusak.
                            </p>
                        </div>

                        {/* Preview Area */}
                        <a href="/2020 Buo The Emerging Threats of Deepfake Attacks and .pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <div style={{
                                aspectRatio: '3/4',
                                backgroundColor: '#1e293b',
                                border: '1px solid #1e3a8a',
                                borderRadius: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                overflow: 'hidden'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(96, 165, 250, 0.3)';
                                    e.currentTarget.style.borderColor = '#60a5fa';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                                    e.currentTarget.style.borderColor = '#1e3a8a';
                                }}
                            >
                                <img
                                    src="/Preview 2020 Buo The Emerging Threats of Deepfake Attacks and _page-0001.jpg"
                                    alt="Preview Journal 4"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                        </a>
                    </div>

                    {/* Journal 5 (Standard Layout) - REAL CONTENT */}
                    <div className="journal-row" style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: '2rem', alignItems: 'center' }}>
                        {/* Preview Area */}
                        <a href="/2024 Sandoval Threat of deepfakes to the criminal justice.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <div style={{
                                aspectRatio: '3/4',
                                backgroundColor: '#1e293b',
                                border: '1px solid #1e3a8a',
                                borderRadius: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                overflow: 'hidden'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(96, 165, 250, 0.3)';
                                    e.currentTarget.style.borderColor = '#60a5fa';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                                    e.currentTarget.style.borderColor = '#1e3a8a';
                                }}
                            >
                                <img
                                    src="/Preview 2024 Sandoval Threat of deepfakes to the criminal justice_page-0001.jpg"
                                    alt="Preview Journal 5"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                        </a>

                        {/* Description Area */}
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f8fafc', fontFamily: 'var(--font-display)' }}>Threat of deepfakes to the criminal justice system: a systematic review</h3>
                            <p style={{ textAlign: 'justify', fontSize: '1rem' }}>
                                Teknologi deepfake menimbulkan ancaman serius terhadap <strong>integritas sistem peradilan pidana</strong> melalui <strong>pemalsuan bukti digital</strong>, pengikisan kepercayaan publik terhadap lembaga hukum, serta penciptaan fenomena "dunia pasca-kebenaran" di mana bukti visual tidak lagi dianggap sebagai kebenaran mutlak. Potensi bahayanya mencakup penyebaran <strong>pornografi non-konsensual</strong> yang menyasar perempuan secara masif, praktik <strong>penipuan keuangan</strong> dan pencurian identitas melalui kloning suara atau wajah, serta <strong>manipulasi informasi</strong> yang dapat mengacaukan proses demokrasi hingga memicu konflik bersenjata. Sebagai langkah penanganan, sumber menyarankan penggunaan <strong>teknologi deteksi berbasis AI</strong> (seperti <em>Convolutional Neural Networks</em> dan <em>EfficientNet</em>), pemanfaatan <strong>blockchain</strong> untuk validasi konten, serta penerapan protokol verifikasi bukti yang ketat di ruang sidang. Pencegahan jangka panjang memerlukan <strong>reformasi legislatif</strong> yang secara eksplisit mengatur media sintetis, kolaborasi internasional antar lembaga penegak hukum, serta <strong>peningkatan literasi digital</strong> dan pelatihan khusus bagi praktisi hukum agar lebih siap menghadapi ancaman media buatan.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Added style for responsive journal rows */}
            <style jsx>{`
                @media (max-width: 768px) {
                    .journal-row {
                        grid-template-columns: 1fr !important;
                        display: flex !important;
                        flex-direction: column;
                    }
                    /* Ensure preview is always on top (or bottom) if needed, currently flex-column stacks top-down based on HTML order. 
                       For reversed rows (desc then preview), we might want preview first on mobile? 
                       If so we use flex-direction: column-reverse or reorder. 
                       Let's assume standard stack order is fine by user, or I'll assume they want Image/Preview on top.
                    */
                    .journal-row.reverse-mobile {
                        flex-direction: column-reverse !important;
                    }
                }
            `}</style>
>>>>>>> Ver4
        </section>
    );
};

export default DeepfakeInfo;
