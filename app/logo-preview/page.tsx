
import Image from 'next/image';

export default function LogoPreview() {
    const logos = [
        { name: 'Minimalist', src: '/logo-minimalist.svg' },
        { name: 'Globe', src: '/logo-globe.svg' },
        { name: 'Radar', src: '/logo-radar.svg' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
            <h1 className="text-3xl font-bold mb-12 text-gray-900">Logo Concepts</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {logos.map((logo) => (
                    <div key={logo.name} className="flex flex-col items-center gap-4 p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="w-48 h-48 relative">
                            <Image
                                src={logo.src}
                                alt={logo.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">{logo.name}</h2>
                        <p className="text-sm text-gray-500 font-mono">{logo.src}</p>
                    </div>
                ))}
            </div>
            <div className="mt-12 text-center text-gray-600">
                <p>Please select your preferred logo.</p>
            </div>
        </div>
    );
}
