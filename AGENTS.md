<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the gallery feed browser-only with a bounded CORS request and bundled-image fallback; this stage has no backend or real generator.
- Parse feed data in the gallery-feed module and keep pagination/session seed state in the gallery component so the rules are independently testable.
- Render masonry images at their native proportions using CSS columns; sample assets have varied native dimensions and must not be cropped by the UI.
