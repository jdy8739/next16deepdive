const SettingsPage = async () => {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-2xl">
          ⚙️
        </div>
        <div>
          <h2 className="text-xl font-semibold text-zinc-900">포털 설정</h2>
          <p className="text-sm text-zinc-500">
            슬롯 미매칭 하위 경로 — 병렬 슬롯이 default.tsx(플랜 B)로 전환됩니다.
          </p>
        </div>
      </div>
      <p className="mt-5 rounded-xl bg-zinc-50 p-4 text-sm text-zinc-600">
        이 페이지는 @notifications / @qa 슬롯의 page 가 없는 경로입니다. 하드
        네비게이션(F5) 시 프레임워크가 슬롯 매칭을 잃어도, 각 슬롯은 default.tsx
        로 대체되어 404 없이 레이아웃 뼈대가 유지됩니다.
      </p>
    </div>
  );
};

export default SettingsPage;
