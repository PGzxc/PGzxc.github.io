

<table width="100%" border="0" cellspacing="1" cellpadding="4" style="text-align:center;"  align="center">
<tbody>
	<tr style="line-height:110%;text-align:center;color:#255e95;font-weight: bold;font-size: 16px;">
		<td colspan="3" >モバイル端末</td>
		<td colspan="3" >クロスプラットフォーム</td>
        <td colspan="1">ミニプログラム</td>
        <td colspan="1">バックエンド</td>
		<td colspan="1">フロントエンド</td>
        <td colspan="1">AI</td>
		<td colspan="1">デスクトップ</td>
		<td colspan="1">完全版</td>
	</tr>
    <tr>
      <td><a href="#resume-android" class="resume-link" target="_blank">Android</a></td>
      <td><a href="#resume-ios" class="resume-link" target="_blank">iOS</a></td>
      <td><a href="#resume-hm" class="resume-link" target="_blank">HarmonyOS</a></td>
      <td><a href="#resume-flutter" class="resume-link" target="_blank">Flutter</a></td>
      <td><a href="#resume-rn" class="resume-link" target="_blank">React Native</a></td>
      <td><a href="#resume-kmp" class="resume-link" target="_blank">KMP</a></td>
      <td><a href="#resume-xcx" class="resume-link" target="_blank">ミニプログラム</a></td>
      <td><a href="#resume-java" class="resume-link" target="_blank">Java</a></td>
      <td><a href="#resume-front" class="resume-link" target="_blank">Web</a></td>
      <td><a href="#resume-ai" class="resume-link" target="_blank">AI</a></td>
      <td><a href="#resume-csharp" class="resume-link" target="_blank">WinForm</a></td>
      <td><a href="#resume-inex" class="resume-link" target="_blank">完全版</a></td>
    </tr>
</tbody>
</table>

<script>
// 简历下载链接映射
const resumeLinks = {
  '#resume-android': 'https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/resumes-ja/周向成_Android開発エンジニア.pdf',
  '#resume-ios': 'https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/resumes-ja/周向成_iOS開発エンジニア.pdf',
  '#resume-hm': 'https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/resumes-ja/周向成_Harmony開発エンジニア.pdf',
  '#resume-flutter': 'https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/resumes-ja/周向成_Flutter開発エンジニア.pdf',
  '#resume-rn': 'https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/resumes-ja/周向成_React Native開発エンジニア.pdf',
  '#resume-kmp': 'https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/resumes-ja/周向成_KMP開発エンジニア.pdf',
  '#resume-xcx': 'https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/resumes-ja/周向成_ミニプログラム開発.pdf',
  '#resume-java': 'https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/resumes-ja/周向成_Java開発エンジニア.pdf',
  '#resume-front': 'https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/resumes-ja/周向成_フロントエンド開発エンジニア.pdf',
  '#resume-ai': 'https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/resumes-ja/周向成_AI開発エンジニア.pdf',
  '#resume-csharp': 'https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/resumes-ja/周向成_WinForm開発エンジニア.pdf',
  '#resume-inex': 'https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-resume/resumes-ja/index.pdf'
};

// 页面加载时替换链接
window.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('.resume-link');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (resumeLinks[href]) {
      link.setAttribute('href', resumeLinks[href]);
    }
  });
});
</script>

<!--简历下载地址-->
