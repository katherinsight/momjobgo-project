<template>
    <div>
        <br/>
        <br/>
        <v-row>
        <v-text-field label="댓글을 입력하세요" v-model="newComment"></v-text-field><v-btn @click="postComment">저장</v-btn>
        </v-row>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                <tr v-if="commentList.length > 0">
                    <th class="text-left">
                    댓글
                    </th>
                    <th class="text-right">
                    작성일
                    </th>
                    <th class="text-right">
                    작성자
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="item in commentList"
                    :key="item.name"
                >
                    <td style="max-width: 400px;">{{ item.comment }}<v-icon v-if="userInfo.id === item.writer" small @click="deleteComment(item.id)">delete</v-icon></td>
                    <td class="text-right">{{ new Date(item.createdAt) | getWriteTime }}</td>
                    <td class="text-right">{{ item.writer }}</td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import DateMixin from "@/mixins/date";

    export default {
        mixins : [DateMixin],

        props : {
            bno : {
                type : Number
            }
        },

        data : () => ({
            newComment : '',

            commentList : []
        }),

        created() {
            this.callCommentList();
        },

        methods : {
            async callCommentList() {
                if(this.bno !== 0){
                    const response = await this.$api(`/api/board/comment/${this.bno}`, 'GET', null);
                    if(response.status === this.HTTP_OK){
                        this.commentList = response.data;
                    }
                }
            },

            async postComment(){
                if(this.newComment){
                    const response = await this.$api(`/api/board/comment/${this.bno}`,'POST',{comment : this.newComment});
                    if(response.status === this.HTTP_OK || response.status === this.HTTP_CREATED){
                        alert('댓글 등록되었습니다.');
                        this.callCommentList();
                        this.refreshBoardList();
                        this.newComment = ''
                    }
                } else {
                    alert('댓글을 입력해주세요');
                }
            },

            async deleteComment(id){
                if(!confirm('댓글을 삭제 하시겠습니까?')){
                    return false;
                }

                const response = await this.$api(`/api/board/comment/${id}`,'DELETE',null);
                
                if(response.status === this.HTTP_OK){
                    alert('댓글이 삭제되었습니다.');
                    this.callCommentList();
                    this.refreshBoardList();
                }

            },

            refreshBoardList(){
                this.$emit('updated');
            }
        },

        watch : {
            bno : function(){
                this.callCommentList();
            },
        },

        computed : {
            ...mapGetters(['userInfo'])
        }


    }
</script>

<style lang="stylus" scoped>

</style>