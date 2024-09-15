export async function GET(request: Request) {
  if (!process.env.MAL_CLIENT_ID) return Response.json({ error: 'Missing env.' }, { status: 500 });

  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');
  const id = searchParams.get('id');

  if (!path || !id) {
    return Response.json({ error: 'Missing path or id parameter' }, { status: 400 });
  }

  const malData = await fetch(`https://api.myanimelist.net/v2/${path}/${id}?fields=id,title,alternative_titles,media_type,status,genres,start_season,start_date&nsfw=true`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'X-MAL-CLIENT-ID': process.env.MAL_CLIENT_ID }
  }).catch(e => {
    console.error(e);
    return null;
  });

  if (!malData) return Response.json({ error: 'Failed to fetch.' }, { status: 500 });

  const data = await malData.json();

  return Response.json(data);
}
