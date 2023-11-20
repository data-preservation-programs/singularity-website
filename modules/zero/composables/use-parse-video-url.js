// /////////////////////////////////////////////////////////// Parse Video URL
  // ---------------------------------- https://gist.github.com/yangshun/9892961
export const useParseVideoUrl = (url) => {
  const matched = url.match(/(https?:\/\/|\/\/|)(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|dailymotion.com)\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/)
  if (!matched) { return { type: false, id: false, time: false } }
  const parsed = new URL(`https://placeholder-for-parsing.com/${url.split('/').pop()}`)
  const domain = matched[3]
  let type = ''
  if (domain.includes('youtu')) { type = 'youtube' }
  if (domain.includes('vimeo')) { type = 'vimeo' }
  if (domain.includes('dailymotion')) { type = 'dailymotion' }
  return { type, id: matched[6], time: parsed.searchParams.get('t') }
}
