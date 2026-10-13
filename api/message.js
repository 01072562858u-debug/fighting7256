// Vercel 서버리스 함수: 응원 문장 15개 중 하나를 골라 이름과 함께 돌려줍니다.
// 응원 문장은 이 파일에만 있습니다.

const MESSAGES = [
  "오늘도 여기까지 온 것만으로 충분히 잘하고 있어요.",
  "작은 한 걸음도 분명한 앞으로의 걸음이에요.",
  "완벽하지 않아도 괜찮아요. 오늘의 노력이 내일을 만들어요.",
  "지금 느끼는 피곤함은 열심히 살아온 증거예요.",
  "당신의 속도는 틀리지 않았어요. 그대로 가도 괜찮아요.",
  "오늘 하루도 스스로에게 고마워해도 좋은 날이에요.",
  "어려운 순간에도 포기하지 않은 당신이 정말 대단해요.",
  "잠깐 쉬어 가도 괜찮아요. 쉬는 것도 나아가는 일이에요.",
  "당신이 해낸 일들은 생각보다 훨씬 많고 소중해요.",
  "오늘의 작은 노력이 언젠가 큰 힘이 되어 돌아올 거예요.",
  "스스로를 믿어 보세요. 당신은 이미 충분히 해낼 힘이 있어요.",
  "걱정은 잠시 내려놓고, 오늘 할 수 있는 한 가지만 해 봐요.",
  "당신의 꾸준함은 누군가에게 조용한 용기가 되고 있어요.",
  "오늘도 최선을 다한 당신에게 따뜻한 박수를 보내요.",
  "힘든 날이 있어도 괜찮아요. 내일은 또 새로운 하루예요.",
];

const MAX_NAME_LENGTH = 20;

module.exports = function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "허용되지 않는 요청 방식입니다." });
    return;
  }

  let name = req.query && req.query.name;
  if (Array.isArray(name)) name = name[0];
  name = typeof name === "string" ? name.trim().slice(0, MAX_NAME_LENGTH) : "";
  if (!name) name = "여러분";

  const message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];

  res.status(200).json({ text: name + "님, " + message });
};
