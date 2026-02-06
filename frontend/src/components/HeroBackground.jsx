const HeroBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />

      <div className="absolute inset-0">
        <div
          className="absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(79, 70, 229, 0.8) 0%, rgba(67, 56, 202, 0.4) 40%, transparent 70%)",
            top: "20%",
            left: "10%",
            animation: "float1 20s ease-in-out infinite",
          }}
        />

        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.7) 0%, rgba(124, 58, 237, 0.3) 50%, transparent 70%)",
            top: "40%",
            left: "35%",
            animation: "float2 18s ease-in-out infinite",
          }}
        />

        <div
          className="absolute w-[700px] h-[700px] rounded-full blur-[110px] opacity-45"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(37, 99, 235, 0.4) 45%, transparent 70%)",
            top: "50%",
            right: "5%",
            animation: "float3 22s ease-in-out infinite",
          }}
        />

        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, rgba(147, 51, 234, 0.3) 50%, transparent 70%)",
            top: "10%",
            right: "20%",
            animation: "float4 16s ease-in-out infinite",
          }}
        />

        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[90px] opacity-35"
          style={{
            background:
              "radial-gradient(circle, rgba(20, 184, 166, 0.5) 0%, rgba(13, 148, 136, 0.2) 50%, transparent 70%)",
            bottom: "10%",
            left: "25%",
            animation: "float5 19s ease-in-out infinite",
          }}
        />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)",
        }}
      />
    </div>
  );
};

export default HeroBackground;
